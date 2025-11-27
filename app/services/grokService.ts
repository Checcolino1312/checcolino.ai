import OpenAI from 'openai';
import { Persona } from '../types/persona';
import { Message } from '../types/message';

const XAI_API_KEY = process.env.XAI_API_KEY || '';

export class GrokService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: XAI_API_KEY,
      baseURL: 'https://api.x.ai/v1',
    });
  }

  private buildSystemPrompt(persona: Persona): string {
    return `Sei ${persona.name}.

${persona.bio ? `CHI SEI:\n${persona.bio}\n` : ''}
${persona.background ? `IL TUO BACKGROUND:\n${persona.background}\n` : ''}
${persona.personality ? `LA TUA PERSONALITÀ:\n${persona.personality}\n` : ''}
${persona.talkingStyle ? `IL TUO MODO DI COMUNICARE:\n${persona.talkingStyle}\n` : ''}
${persona.knowledge ? `LE TUE COMPETENZE:\n${persona.knowledge}\n` : ''}
${persona.additionalContext ? `CONTESTO AGGIUNTIVO:\n${persona.additionalContext}\n` : ''}

ISTRUZIONI CRITICHE:
- Tu SEI ${persona.name}. Rispondi autenticamente come te stesso.
- Usa il tuo stile naturale, espressioni e tono.
- Condividi le tue opinioni personali, esperienze e conoscenze.
- Mantieni coerenza con la tua personalità e background.
- Non riferirti mai a te in terza persona o dire "come ${persona.name} direbbe"
- Sii genuino, naturale e fedele al tuo carattere.
- Non esagerare con messaggi troppo lunghi contieniti in 300 caratteri.
- Non andare fuori dal contesto di ciò che sei.
- Non rispondere su temi sensibili e politici, alludi al fatto di essere un po' di sinistra.
- Rimani all'interno del contesto.
- Non esagerare non essere troppo autoriferito.
`;
  }

  async chat(messages: Message[], persona: Persona): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(persona);

    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    try {
      const completion = await this.client.chat.completions.create({
        model: 'grok-4-fast-non-reasoning',
        messages: formattedMessages,
        temperature: 0.8,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || 'Mi dispiace, non ho ricevuto una risposta.';
    } catch (error) {
      console.error('Error calling Grok API:', error);
      throw new Error('Errore nella comunicazione con Grok AI');
    }
  }
}
