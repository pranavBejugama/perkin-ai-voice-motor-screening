import { Session } from '@/types/session';
import { getStatusColor } from '@/lib/scoring';

interface ResultSummaryProps {
  session: Session;
}

export default function ResultSummary({ session }: ResultSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-xs text-slate-500 font-medium mb-1">Voice Motor Score</div>
        <div className="text-3xl font-bold text-blue-600 tabular-nums">{session.score}</div>
        <div className="text-xs text-slate-500">/ 100</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-xs text-slate-500 font-medium mb-2">Status</div>
        <span className={`inline-block px-3 py-1.5 text-sm font-semibold rounded-lg border ${getStatusColor(session.status)}`}>
          {session.status}
        </span>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-xs text-slate-500 font-medium mb-1">Confidence</div>
        <div className="text-3xl font-bold text-slate-900 tabular-nums">{session.confidence}%</div>
        <div className="text-xs text-slate-500">analysis quality</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="text-xs text-slate-500 font-medium mb-1">Task Type</div>
        <div className="text-base font-semibold text-slate-900">Rainbow passage</div>
        <div className="text-xs text-slate-500">standard reading</div>
      </div>
    </div>
  );
}
