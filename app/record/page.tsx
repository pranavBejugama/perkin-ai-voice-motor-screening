'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';
import ScriptReader from '@/components/ScriptReader';
import AudioRecorder from '@/components/AudioRecorder';
import { startSession, uploadAudio } from '@/lib/apiClient';

export default function RecordPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState({ isRecording: false, recordingTime: 0 });

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      setError(null);
      const { sessionId: sid } = await startSession();
      setSessionId(sid);
      const { transcript: t } = await uploadAudio(audioBlob, sid);
      setTranscript(t);
    } catch (e) {
      setError('Failed to process recording. Please try again.');
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecordingStateChange = (state: { isRecording: boolean; recordingTime: number }) => {
    setRecordingState(state);
  };

  const handleContinue = () => {
    if (sessionId) router.push(`/processing?sessionId=${sessionId}`);
  };

  return (
    <>
      <StepIndicator currentStep={3} />
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Voice Recording Session</h1>
          <p className="text-slate-600 text-sm mt-1">Read the passage aloud while we record your voice</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="order-2 lg:order-1">
            <ScriptReader
              transcript={transcript}
              isRecording={recordingState.isRecording}
              recordingTime={recordingState.recordingTime}
            />
          </div>
          <div className="order-1 lg:order-2">
            <AudioRecorder
              onRecordingComplete={handleRecordingComplete}
              onRecordingStateChange={handleRecordingStateChange}
            />
          </div>
        </div>

        {transcript && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Transcript Preview</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{transcript}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
            <span className="text-sm text-blue-800">Processing your recording...</span>
          </div>
        )}

        <div className="flex gap-4 justify-between">
          <button
            onClick={() => router.push('/task')}
            className="px-6 py-3 text-sm font-medium border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Back to Instructions
          </button>
          <button
            onClick={handleContinue}
            disabled={!transcript || isProcessing}
            className={`px-6 py-3 text-sm font-semibold rounded-lg ${
              transcript && !isProcessing
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            Continue to Analysis
          </button>
        </div>
      </div>
    </>
  );
}
