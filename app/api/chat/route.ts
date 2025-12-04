import { NextRequest, NextResponse } from 'next/server';
import { GrokService } from '@/app/services/grokService';
import { Message } from '@/app/types/message';
import { loadPersona } from '@/app/lib/personaLoader';

// CORS helper function
function getCorsHeaders(origin: string | null) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://francesco-paolo-ragusa.vercel.app',
  ];

  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin || '') ? origin! : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await request.json();
    const { messages } = body as {
      messages: Message[];
    };

    if (!messages) {
      return NextResponse.json(
        { error: 'Missing messages' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Load persona configuration from server-side
    const persona = await loadPersona();

    const grokService = new GrokService();
    const response = await grokService.chat(messages, persona);

    return NextResponse.json({ response }, { headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
