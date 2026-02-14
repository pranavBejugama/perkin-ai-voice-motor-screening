'use client';

import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';

export default function TaskPage() {
  const router = useRouter();

  return (
    <>
      <StepIndicator currentStep={2} />
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Recording Instructions</h1>
          </div>
          <div className="p-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <h2 className="text-sm font-semibold text-blue-900 mb-2">Before You Begin</h2>
              <p className="text-sm text-blue-800">Quiet environment. Normal volume and pace. Microphone 6-12 inches from mouth.</p>
            </div>
            <div className="space-y-4 mb-6">
              {[
                { n: 1, t: 'Microphone Setup', d: 'Allow browser access. Position 6-12 inches from mouth.' },
                { n: 2, t: 'Read Passage', d: 'Read on-screen passage aloud at normal pace.' },
                { n: 3, t: 'Duration', d: 'Record 30-60 seconds. Stop when finished.' },
                { n: 4, t: 'Submit', d: 'Review, then submit for analysis.' },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">{s.t}</div>
                    <div className="text-sm text-slate-600">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => router.push('/consent')}
                className="px-6 py-3 text-sm font-medium border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => router.push('/record')}
                className="px-6 py-3 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Recording
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
