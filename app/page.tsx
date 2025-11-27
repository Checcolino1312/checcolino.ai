'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Fade,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message } from './types/message';
import { MessageContent } from './components/MessageContent';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hei sono Checcolino. Dimmi',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Riprova.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          backdropFilter: 'blur(8px)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
            <Box>
              <Typography
                variant="h1"
                color="text.primary"
                sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
              >
                Chat with Francesco
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Conversazione con la persona AI
              </Typography>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          pb: 2,
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {messages.map((message, index) => (
              <Fade in key={message.id} timeout={300}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      maxWidth: { xs: '90%', sm: '85%' },
                      p: { xs: 2.5, sm: 3 },
                      borderRadius: 3,
                      bgcolor: message.role === 'user' ? 'primary.light' : 'background.paper',
                      border: message.role === 'assistant' ? 1 : 0,
                      borderColor: 'divider',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <MessageContent content={message.content} />
                  </Paper>
                </Box>
              </Fade>
            ))}
            {isLoading && (
              <Fade in timeout={300}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2.5, sm: 3 },
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <CircularProgress size={16} thickness={5} />
                      <Typography variant="body2" color="text.secondary">
                        Sto pensando...
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Fade>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </Container>
      </Box>

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          backdropFilter: 'blur(8px)',
          py: { xs: 2, sm: 2.5 },
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Scrivi un messaggio..."
              disabled={isLoading}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                  minHeight: '56px',
                  alignItems: 'flex-end',
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              endIcon={!isMobile && <SendIcon />}
              sx={{
                minWidth: { xs: '56px', sm: '120px' },
                height: '56px',
                px: { xs: 2, sm: 3 },
              }}
            >
              {isMobile ? <SendIcon /> : 'Invia'}
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
