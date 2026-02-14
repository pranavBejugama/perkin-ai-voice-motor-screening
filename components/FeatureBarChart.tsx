'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Session } from '@/types/session';

interface FeatureBarChartProps {
  features: Session['features'];
}

export default function FeatureBarChart({ features }: FeatureBarChartProps) {
  const data = [
    { name: 'Speech Rate', value: features.speechRate, unit: 'wpm', color: '#2563EB' },
    { name: 'Pause Ratio', value: features.pauseRatio * 100, unit: '%', color: '#0D9488' },
    { name: 'Pitch Variance', value: features.pitchVariance * 100, unit: '%', color: '#DC2626' },
    { name: 'Loudness Var', value: features.loudnessVariance * 100, unit: '%', color: '#059669' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Feature Analysis</h3>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value, _name, item: { payload?: { unit?: string } }) => {
                const unit = item?.payload?.unit ?? '';
                return [`${Number(value).toFixed(1)}${unit}`, 'Value'];
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
