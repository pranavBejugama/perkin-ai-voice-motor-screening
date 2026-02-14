'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onRecordingStateChange?: (state: { isRecording: boolean; recordingTime: number }) => void;
}

export default function AudioRecorder({ onRecordingComplete, onRecordingStateChange }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentBlobRef = useRef<Blob | null>(null);
  const recordingTimeRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        currentBlobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setHasRecording(true);
        onRecordingStateChange?.({ isRecording: false, recordingTime: recordingTimeRef.current });
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimeRef.current = 0;
      timerRef.current = setInterval(() => {
        setRecordingTime((p) => {
          const next = p + 1;
          recordingTimeRef.current = next;
          onRecordingStateChange?.({ isRecording: true, recordingTime: next });
          return next;
        });
      }, 1000);
    } catch (e) {
      setError('Microphone access denied. Please grant permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const pauseRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((p) => {
          const next = p + 1;
          recordingTimeRef.current = next;
          onRecordingStateChange?.({ isRecording: true, recordingTime: next });
          return next;
        });
      }, 1000);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    currentBlobRef.current = null;
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const handleUseRecording = () => {
    if (currentBlobRef.current) onRecordingComplete(currentBlobRef.current);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-900">Audio Recording</h3>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center flex-1 flex flex-col justify-center">
          <div className={`w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center mb-4 ${
            isRecording && !isPaused ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
          }`}>
            {isRecording && !isPaused ? (
              <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse" />
            ) : (
              <div className="w-10 h-10 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="text-3xl font-mono font-bold text-slate-900 mb-2">{formatTime(recordingTime)}</div>
          {isRecording && <div className="text-sm text-slate-500 mb-6">{isPaused ? 'Paused' : 'Recording...'}</div>}
          {!hasRecording && !isRecording && (
            <button
              onClick={startRecording}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg"
            >
              Start Recording
            </button>
          )}
          {isRecording && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={pauseRecording}
                className="px-6 py-3 text-base font-semibold bg-slate-600 hover:bg-slate-700 text-white rounded-lg"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={stopRecording}
                className="px-6 py-3 text-base font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Stop
              </button>
            </div>
          )}
          {hasRecording && audioUrl && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 font-semibold mb-2">Recording complete</p>
                <audio controls src={audioUrl} className="w-full h-10" />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={resetRecording}
                  className="flex-1 py-3 text-base font-semibold border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Re-record
                </button>
                <button
                  onClick={handleUseRecording}
                  className="flex-1 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Use Recording
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
