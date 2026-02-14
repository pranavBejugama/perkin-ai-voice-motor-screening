'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';
import ResultSummary from '@/components/ResultSummary';
import FeatureBarChart from '@/components/FeatureBarChart';
import FeatureMetricsTable from '@/components/FeatureMetricsTable';
import TrendChart from '@/components/TrendChart';
import { Session } from '@/types/session';
import { fetchHistory } from '@/lib/apiClient';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [session, setSession] = useState<Session | null>(null);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!sessionId) {
        router.push('/record');
        return;
      }
      try {
        const { sessions } = await fetchHistory();
        setAllSessions(sessions);
        const found = sessions.find((s) => s.id === sessionId);
        if (found) setSession(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId, router]);

  if (loading || !session) {
    return (
      <>
        <StepIndicator currentStep={5} />
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="animate-spin w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-600">Loading results...</p>
          </div>
        </div>
      </>
    );
  }

  const recs = {
    attention: [
      'Results show patterns warranting medical attention.',
      'Schedule appointment with neurologist or movement disorder specialist.',
      'Bring this report to your healthcare provider.',
    ],
    monitor: [
      'Results show some atypical patterns.',
      'Consider follow-up screening in 2-4 weeks.',
      'Consult healthcare provider if symptoms persist or worsen.',
    ],
    stable: [
      'Results appear within normal ranges.',
      'Continue regular monitoring if you have risk factors.',
      'Consult healthcare provider if you notice changes in speech or movement.',
    ],
  };

  return (
    <>
      <StepIndicator currentStep={5} />
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Voice Motor Screening Results</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/history')}
              className="px-4 py-2 text-sm font-medium border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              View All Sessions
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              New Screening Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ResultSummary session={session} />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Session Metadata</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500">Date</td>
                  <td className="py-2 font-mono text-slate-900">{new Date(session.date).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 text-slate-500">Session ID</td>
                  <td className="py-2 font-mono text-slate-900 text-xs">{session.id}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500">Environment</td>
                  <td className="py-2 text-slate-900">Web</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FeatureBarChart features={session.features} />
          <TrendChart sessions={allSessions} />
        </div>

        <div className="mb-8">
          <FeatureMetricsTable features={session.features} />
        </div>

        {session.transcript && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Recording Transcript</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{session.transcript}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">Clinical Recommendations</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            {recs[session.status].map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900">
            <strong>Reminder:</strong> This is a screening result, not a diagnosis. Consult a qualified healthcare professional for interpretation.
          </p>
        </div>
      </div>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="max-w-[1200px] mx-auto px-6 py-16"><div className="bg-white rounded-xl border border-slate-200 p-16 text-center text-slate-600">Loading...</div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
