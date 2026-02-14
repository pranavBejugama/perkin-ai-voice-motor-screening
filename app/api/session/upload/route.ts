import { NextRequest, NextResponse } from 'next/server';
import { generateMockTranscript } from '@/lib/mockAnalysis';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as File;
    const sessionId = formData.get('sessionId') as string;

    if (!audio || !sessionId) {
      return NextResponse.json(
        { error: 'Missing audio file or session ID' },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Upload audio to storage (S3, etc.)
    // 2. Send to speech-to-text API (Gemini, Whisper, etc.)
    // 3. Return actual transcript
    
    // For now, return mock transcript
    const transcript = generateMockTranscript();

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process audio upload' },
      { status: 500 }
    );
  }
}
