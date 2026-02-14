export interface Session {
  id: string;
  date: string;
  score: number;
  status: "stable" | "monitor" | "attention";
  confidence: number;
  features: {
    speechRate: number;
    pauseRatio: number;
    pitchVariance: number;
    loudnessVariance: number;
  };
  transcript?: string;
}

export interface FeatureMetric {
  metric: string;
  value: number;
  baseline: number;
  change: number;
  interpretation: string;
}
