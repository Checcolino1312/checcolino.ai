import { NextRequest, NextResponse } from 'next/server';
import { GrokService } from '@/app/services/grokService';
import { Message } from '@/app/types/message';
import { loadPersona } from '@/app/lib/personaLoader';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as {
      messages: Message[];
    };

    if (!messages) {
      return NextResponse.json(
        { error: 'Missing messages' },
        { status: 400 }
      );
    }

    // Load persona configuration from server-side
    const persona = await loadPersona();

    const grokService = new GrokService();
    const response = await grokService.chat(messages, persona);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
