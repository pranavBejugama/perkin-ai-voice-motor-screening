import { Session } from '@/types/session';

export function calculateScore(features: Session['features']): number {
  // Normalize features to 0-100 scale
  // Higher speech rate is better (inverse of bradykinesia)
  const speechRateScore = Math.min(100, ((features.speechRate - 90) / 80) * 100);
  
  // Lower pause ratio is better
  const pauseScore = Math.max(0, 100 - (features.pauseRatio * 250));
  
  // Higher variance in pitch is better (monotone voice is a symptom)
  const pitchScore = Math.min(100, (features.pitchVariance / 0.9) * 100);
  
  // Higher variance in loudness is better
  const loudnessScore = Math.min(100, (features.loudnessVariance / 1.0) * 100);
  
  // Weighted average
  const totalScore = (
    speechRateScore * 0.3 +
    pauseScore * 0.25 +
    pitchScore * 0.25 +
    loudnessScore * 0.2
  );
  
  return Math.round(Math.max(0, Math.min(100, totalScore)));
}

export function getStatus(score: number): "stable" | "monitor" | "attention" {
  if (score >= 80) return "stable";
  if (score >= 65) return "monitor";
  return "attention";
}

export function getStatusColor(status: "stable" | "monitor" | "attention"): string {
  switch (status) {
    case "stable":
      return "bg-green-100 text-green-800 border-green-300";
    case "monitor":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "attention":
      return "bg-red-100 text-red-800 border-red-300";
  }
}

export function getConfidence(features: Session['features']): number {
  // Simulate confidence based on feature variance
  const variance = Math.abs(features.speechRate - 140) + 
                   Math.abs(features.pauseRatio - 0.22) * 100 +
                   Math.abs(features.pitchVariance - 0.55) * 100 +
                   Math.abs(features.loudnessVariance - 0.65) * 100;
  
  const confidence = Math.max(75, Math.min(98, 95 - (variance / 10)));
  return Math.round(confidence);
}
