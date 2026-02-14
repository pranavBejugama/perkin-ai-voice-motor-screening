'use client';

import { useMemo, useEffect, useRef } from 'react';
import {
  SCRIPT_PASSAGE,
  splitIntoWords,
  matchTranscriptToScript,
  getCurrentWordIndexDuringRecording,
  WordState,
} from '@/lib/scriptMatching';

interface ScriptReaderProps {
  transcript?: string | null;
  isRecording?: boolean;
  recordingTime?: number;
}

export default function ScriptReader({ transcript, isRecording = false, recordingTime = 0 }: ScriptReaderProps) {
  const scriptWords = useMemo(() => splitIntoWords(SCRIPT_PASSAGE), []);

  const wordStates = useMemo((): WordState[] => {
    if (transcript) {
      return matchTranscriptToScript(scriptWords, transcript);
    }
    if (isRecording) {
      const currentIdx = getCurrentWordIndexDuringRecording(scriptWords, recordingTime);
      return scriptWords.map((_, i) => {
        if (i < currentIdx) return 'default';
        if (i === currentIdx) return 'current';
        return 'default';
      });
    }
    return scriptWords.map((_, i) => (i === 0 ? 'current' : 'default'));
  }, [scriptWords, transcript, isRecording, recordingTime]);

  const completedCount = transcript
    ? wordStates.filter((s) => s === 'correct' || s === 'incorrect').length
    : getCurrentWordIndexDuringRecording(scriptWords, recordingTime);
  const progress = scriptWords.length > 0 ? (completedCount / scriptWords.length) * 100 : 0;
  const estimatedWpm = recordingTime > 0 ? Math.round((completedCount / recordingTime) * 60) : 0;

  const currentRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [wordStates.findIndex((s) => s === 'current')]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-900">Read This Passage Aloud</span>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-600">Time: <span className="font-mono font-semibold text-slate-900">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span></span>
            <span className="text-slate-600">Words: <span className="font-mono font-semibold text-slate-900">{completedCount}/{scriptWords.length}</span></span>
            <span className="text-slate-600">WPM: <span className="font-mono font-semibold text-blue-600">{estimatedWpm || '—'}</span></span>
          </div>
        </div>
        <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="p-5 flex-1 overflow-auto">
        <div className="font-mono text-lg leading-relaxed text-slate-900">
          {scriptWords.map((word, i) => {
            const state = wordStates[i];
            return (
              <span
                key={i}
                ref={state === 'current' ? currentRef : undefined}
                className={`mx-0.5 ${
                  state === 'correct'
                    ? 'text-slate-900'
                    : state === 'incorrect'
                    ? 'text-red-600 bg-red-50'
                    : state === 'current'
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-slate-400'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div className="px-5 py-2 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
        Read at normal pace. Speak clearly and naturally.
      </div>
    </div>
  );
}
