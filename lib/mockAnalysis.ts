import { Session } from '@/types/session';
import { calculateScore, getStatus, getConfidence } from './scoring';

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateMockFeatures(): Session['features'] {
  return {
    speechRate: Math.round(randomInRange(110, 170)),
    pauseRatio: Math.round(randomInRange(0.10, 0.35) * 100) / 100,
    pitchVariance: Math.round(randomInRange(0.30, 0.80) * 100) / 100,
    loudnessVariance: Math.round(randomInRange(0.40, 0.90) * 100) / 100,
  };
}

export function generateMockSession(sessionId: string, transcript?: string): Session {
  const features = generateMockFeatures();
  const score = calculateScore(features);
  const status = getStatus(score);
  const confidence = getConfidence(features);
  
  return {
    id: sessionId,
    date: new Date().toISOString(),
    score,
    status,
    confidence,
    features,
    transcript,
  };
}

export function generateMockTranscript(): string {
  const transcripts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Speaking clearly is important for voice analysis. Motor speech patterns can reveal important health information.",
    "Today is a beautiful day for testing voice analysis. Clear pronunciation and consistent pace help with accurate results. Voice motor screening is a valuable healthcare tool.",
    "Testing one two three. The rainbow has seven colors. Speech patterns include rhythm, pace, and clarity. Voice analysis technology continues to improve every year.",
  ];
  
  return transcripts[Math.floor(Math.random() * transcripts.length)];
}

// Store mock sessions in memory (will be replaced by MongoDB)
const mockSessions: Session[] = [];

export function saveMockSession(session: Session): void {
  mockSessions.push(session);
  // Keep only last 10 sessions
  if (mockSessions.length > 10) {
    mockSessions.shift();
  }
}

export function getMockSessions(): Session[] {
  return [...mockSessions].reverse(); // Most recent first
}
