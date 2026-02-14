'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Session } from '@/types/session';
import { fetchHistory } from '@/lib/apiClient';
import { getStatusColor } from '@/lib/scoring';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      try {
        const { sessions: s } = await fetchHistory();
        setSessions(s);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = statusFilter === 'all' ? sessions : sessions.filter((s) => s.status === statusFilter);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="animate-spin w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Loading session history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Session History</h1>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600 font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white"
          >
            <option value="all">All</option>
            <option value="stable">Stable</option>
            <option value="monitor">Monitor</option>
            <option value="attention">Attention</option>
          </select>
          <Link
            href="/"
            className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            New Session
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-lg font-semibold text-slate-500 mb-2">
              {statusFilter === 'all' ? 'No sessions yet' : `No ${statusFilter} sessions`}
            </div>
            <p className="text-sm text-slate-400 mb-6">
              {statusFilter === 'all' ? 'Complete a voice motor screening to see results here.' : 'Try selecting "All" or complete more sessions.'}
            </p>
            {statusFilter === 'all' && (
              <Link href="/" className="inline-block px-6 py-3 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start First Session
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              Showing {filtered.length} session{filtered.length !== 1 ? 's' : ''}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">Session ID</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Score</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Status</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Confidence</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Speech Rate</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Pause Ratio</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-6 py-4 font-mono text-slate-900 border-b border-slate-100">
                        {new Date(s.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600 border-b border-slate-100 text-xs">
                        {s.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-blue-600 border-b border-slate-100">{s.score}</td>
                      <td className="px-6 py-4 text-center border-b border-slate-100">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-slate-900 border-b border-slate-100">{s.confidence}%</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-900 border-b border-slate-100">{s.features.speechRate} wpm</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-900 border-b border-slate-100">
                        {(s.features.pauseRatio * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-center border-b border-slate-100">
                        <Link href={`/results?sessionId=${s.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 border-t border-slate-200">
              <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Avg Score</div>
                <div className="text-xl font-bold text-slate-900">
                  {filtered.length ? Math.round(filtered.reduce((a, s) => a + s.score, 0) / filtered.length) : 0}
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Latest</div>
                <div className="text-xl font-bold text-blue-600">{filtered[0]?.score ?? 0}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Stable</div>
                <div className="text-xl font-bold text-green-600">{filtered.filter((s) => s.status === 'stable').length}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Attention</div>
                <div className="text-xl font-bold text-red-600">{filtered.filter((s) => s.status === 'attention').length}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
