# Chat with Francesco (Checcolino)

Un'applicazione di chat AI che ti permette di conversare con la persona digitale di Francesco, powered by xAI Grok.

## Caratteristiche

- 💬 **Interfaccia Stile Claude**: Design pulito e minimalista con palette colori caldi
- 🎨 **Markdown Support**: Supporto completo per formattazione, code blocks con syntax highlighting
- 🤖 **Powered by xAI Grok**: Utilizza il modello `grok-4-fast-non-reasoning` per risposte intelligenti
- 📝 **Configurazione Markdown**: Persona configurata tramite file markdown facilmente modificabile
- 📱 **Responsive Design**: Ottimizzato per mobile, tablet e desktop

## Setup

1. **Installa le dipendenze**:
```bash
npm install
```

2. **Configura la chiave API di xAI**:
   - Copia `.env.example` in `.env.local`
   - Inserisci la tua chiave API di xAI:
```
XAI_API_KEY=tua_chiave_api_qui
```

3. **Configura la persona** (opzionale):
   Modifica il file `data/francesco.md` per personalizzare le informazioni della persona AI:
   - Nome
   - Biografia
   - Background
   - Personalità
   - Stile di comunicazione
   - Competenze
   - Contesto aggiuntivo

4. **Avvia il server di sviluppo**:
```bash
npm run dev
```

5. **Apri il browser** su [http://localhost:3000](http://localhost:3000)

## Come Modificare la Persona

Apri e modifica il file `data/francesco.md`:

```markdown
# Francesco (Checcolino) - Configurazione Persona

## Name
Francesco

## Bio
[Inserisci qui la tua biografia...]

## Background
[Inserisci qui il tuo background professionale...]

## Personality
[Descrivi i tuoi tratti della personalità...]

## Talking Style
[Descrivi come comunichi...]

## Knowledge
[Elenca le tue aree di competenza...]

## Additional Context
[Contesto aggiuntivo opzionale...]
```

Il file viene caricato automaticamente dal server ad ogni richiesta, quindi le modifiche saranno visibili al prossimo refresh.

## Tecnologie Utilizzate

- **Next.js 16** - Framework React con App Router
- **React 19** - Libreria UI
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **xAI Grok API** - Intelligenza Artificiale
- **react-markdown** - Rendering markdown nei messaggi
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Syntax highlighting per code blocks

## Struttura del Progetto

```
checcolino-ai/
├── app/
│   ├── api/chat/             # API endpoint per chat
│   │   └── route.ts          # POST handler
│   ├── components/           # Componenti React
│   │   └── MessageContent.tsx # Rendering markdown
│   ├── types/                # Tipi TypeScript
│   │   ├── persona.ts        # Interface Persona
│   │   └── message.ts        # Interface Message
│   ├── services/             # Business logic
│   │   └── grokService.ts    # Integrazione xAI Grok
│   ├── lib/                  # Utilities
│   │   └── personaLoader.ts  # Caricamento markdown
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage con chat
│   └── globals.css           # Stili globali
├── data/
│   └── francesco.md          # Configurazione persona
├── .env.local                # Chiave API (non committata)
└── .env.example              # Template per env
```

## Design UI

L'interfaccia è ispirata allo stile di Claude:

- **Colori**: Palette calda beige/cream/orange
- **Layout**: Colonna centrata (max-width: 768px)
- **Typography**: Font system stack con line-height generosa (1.6)
- **Spacing**: Spaziatura abbondante tra messaggi
- **Messages**:
  - Messaggi utente: Background pesca chiaro, allineati a destra
  - Messaggi assistant: Background bianco con bordo sottile, allineati a sinistra
- **Markdown**: Supporto completo per formattazione e code blocks

## Note

- La configurazione persona è caricata server-side dal file markdown
- Nessun dato utente salvato in localStorage o database
- Le chiavi API sono gestite server-side tramite variabili d'ambiente
- Dark mode supportato automaticamente tramite `prefers-color-scheme`

## Sviluppo

### Build per produzione
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Licenza

Questo progetto è open source e disponibile sotto licenza MIT.
