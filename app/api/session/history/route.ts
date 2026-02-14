import { NextRequest, NextResponse } from 'next/server';
import { getMockSessions } from '@/lib/mockAnalysis';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    // In production, this would query MongoDB
    // If sessionId provided, return that specific session
    // Otherwise return all sessions (with pagination)

    const sessions = getMockSessions();

    if (sessionId) {
      const session = sessions.find(s => s.id === sessionId);
      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ sessions: [session] });
    }

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session history' },
      { status: 500 }
    );
  }
}
