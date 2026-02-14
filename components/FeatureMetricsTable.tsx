'use client';

import { useState } from 'react';
import { Session, FeatureMetric } from '@/types/session';

interface FeatureMetricsTableProps {
  features: Session['features'];
}

export default function FeatureMetricsTable({ features }: FeatureMetricsTableProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baselines = {
    speechRate: 140,
    pauseRatio: 0.22,
    pitchVariance: 0.55,
    loudnessVariance: 0.65,
  };

  const metrics: FeatureMetric[] = [
    {
      metric: 'Speech Rate',
      value: features.speechRate,
      baseline: baselines.speechRate,
      change: ((features.speechRate - baselines.speechRate) / baselines.speechRate) * 100,
      interpretation: features.speechRate < 120 ? 'Below normal (bradykinesia indicator)' : features.speechRate < 130 ? 'Slightly reduced' : 'Within normal range',
    },
    {
      metric: 'Pause Ratio',
      value: features.pauseRatio,
      baseline: baselines.pauseRatio,
      change: ((features.pauseRatio - baselines.pauseRatio) / baselines.pauseRatio) * 100,
      interpretation: features.pauseRatio > 0.30 ? 'Elevated pausing pattern' : features.pauseRatio > 0.25 ? 'Slightly elevated' : 'Within normal range',
    },
    {
      metric: 'Pitch Variance',
      value: features.pitchVariance,
      baseline: baselines.pitchVariance,
      change: ((features.pitchVariance - baselines.pitchVariance) / baselines.pitchVariance) * 100,
      interpretation: features.pitchVariance < 0.40 ? 'Reduced variance (monotone indicator)' : features.pitchVariance < 0.50 ? 'Slightly reduced' : 'Within normal range',
    },
    {
      metric: 'Loudness Variance',
      value: features.loudnessVariance,
      baseline: baselines.loudnessVariance,
      change: ((features.loudnessVariance - baselines.loudnessVariance) / baselines.loudnessVariance) * 100,
      interpretation: features.loudnessVariance < 0.50 ? 'Reduced variance (hypophonia indicator)' : features.loudnessVariance < 0.60 ? 'Slightly reduced' : 'Within normal range',
    },
  ];

  const formatValue = (metric: string, value: number) => {
    if (metric === 'Speech Rate') return `${value} wpm`;
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatBaseline = (metric: string, baseline: number) => {
    if (metric === 'Speech Rate') return `${baseline} wpm`;
    return `${(baseline * 100).toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    const abs = Math.abs(change);
    if (abs < 5) return 'text-green-700';
    if (abs < 15) return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 border-b border-slate-200"
      >
        <span className="font-semibold text-slate-900">Detailed Feature Metrics</span>
        <span className={`inline-block text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
      </button>
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-800">Metric</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-800">Value</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-800">Baseline</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-800">Change</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-800">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={m.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-3 font-medium text-slate-900 border-b border-slate-100">{m.metric}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900 tabular-nums border-b border-slate-100">
                    {formatValue(m.metric, m.value)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600 tabular-nums border-b border-slate-100">
                    {formatBaseline(m.metric, m.baseline)}
                  </td>
                  <td className={`px-4 py-3 text-right font-mono font-semibold tabular-nums border-b border-slate-100 ${getChangeColor(m.change)}`}>
                    {m.change > 0 ? '+' : ''}{m.change.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-slate-700 border-b border-slate-100">{m.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
