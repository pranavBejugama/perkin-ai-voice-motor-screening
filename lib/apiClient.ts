import { Session } from '@/types/session';

export async function startSession(): Promise<{ sessionId: string }> {
  const response = await fetch('/api/session/start', {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to start session');
  }
  
  return response.json();
}

export async function uploadAudio(
  audioBlob: Blob,
  sessionId: string
): Promise<{ transcript: string }> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('sessionId', sessionId);
  
  const response = await fetch('/api/session/upload', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload audio');
  }
  
  return response.json();
}

export async function analyzeSession(sessionId: string): Promise<{ session: Session }> {
  const response = await fetch('/api/session/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze session');
  }
  
  return response.json();
}

export async function fetchHistory(sessionId?: string): Promise<{ sessions: Session[] }> {
  const url = sessionId 
    ? `/api/session/history?sessionId=${sessionId}`
    : '/api/session/history';
    
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  
  return response.json();
}
