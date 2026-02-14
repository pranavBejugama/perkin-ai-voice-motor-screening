'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';
import { analyzeSession } from '@/lib/apiClient';

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing...');

  useEffect(() => {
    if (!sessionId) {
      router.push('/record');
      return;
    }
    const stages = [
      { p: 20, t: 'Processing audio...', d: 500 },
      { p: 40, t: 'Extracting features...', d: 1000 },
      { p: 60, t: 'Analyzing patterns...', d: 1500 },
      { p: 80, t: 'Measuring variance...', d: 2000 },
      { p: 95, t: 'Generating score...', d: 2500 },
      { p: 100, t: 'Complete', d: 3000 },
    ];
    const timers = stages.map((s) => setTimeout(() => {
      setProgress(s.p);
      setStage(s.t);
    }, s.d));
    const run = async () => {
      try {
        await analyzeSession(sessionId);
        setTimeout(() => router.push(`/results?sessionId=${sessionId}`), 3500);
      } catch (e) {
        setStage('Analysis failed.');
      }
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [sessionId, router]);

  const pipeline = ['Audio preprocessing', 'Feature extraction', 'Pattern analysis', 'Variance calc', 'Score generation'];

  return (
    <>
      <StepIndicator currentStep={4} />
      <div className="max-w-[600px] mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900">Analyzing Voice Recording</h1>
          </div>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-slate-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{progress}%</span>
              </div>
              <div className="text-base font-semibold text-slate-900">{stage}</div>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
              <div className="text-xs text-slate-500 font-semibold uppercase mb-3">Pipeline</div>
              <div className="space-y-2">
                {pipeline.map((p, i) => (
                  <div
                    key={p}
                    className={`flex items-center gap-3 text-sm ${progress >= (i + 1) * 20 ? 'text-green-700' : 'text-slate-400'}`}
                  >
                    <div className={`w-4 h-4 rounded-full ${progress >= (i + 1) * 20 ? 'bg-green-600' : 'bg-slate-300'}`} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-slate-500">Typically 5-10 seconds</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="max-w-[600px] mx-auto px-6 py-12"><div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-600">Loading...</div></div>}>
      <ProcessingContent />
    </Suspense>
  );
}
