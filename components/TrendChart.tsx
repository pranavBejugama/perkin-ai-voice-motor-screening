'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Session } from '@/types/session';

interface TrendChartProps {
  sessions: Session[];
}

export default function TrendChart({ sessions }: TrendChartProps) {
  const last5 = sessions.slice(-5).reverse();
  const data = last5.map((s, i) => ({
    label: `S${i + 1}`,
    score: s.score,
    date: new Date(s.date).toLocaleDateString(),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Score Trend (Last 5)</h3>
      </div>
      <div className="p-4">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                formatter={(v: number) => [v, 'Score']}
                labelFormatter={(_label: string, payload: { payload?: { date?: string } }[]) => (payload?.[0]?.payload?.date ?? '')}
              />
              <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500">No historical data</div>
              <div className="text-xs text-slate-400 mt-1">Complete more sessions</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
