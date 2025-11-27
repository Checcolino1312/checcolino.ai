import { Box, Link, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        '& p': {
          color: 'text.primary',
          lineHeight: 1.6,
          margin: '0.5em 0',
          '&:first-of-type': { marginTop: 0 },
          '&:last-of-type': { marginBottom: 0 },
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: 'text.primary',
          fontWeight: 600,
          margin: '0.75em 0 0.5em',
          '&:first-of-type': { marginTop: 0 },
        },
        '& code': {
          bgcolor: theme.palette.mode === 'dark' ? '#2D2926' : '#F0EDE8',
          color: 'text.primary',
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          fontSize: '0.875em',
          fontFamily: 'var(--font-geist-mono), monospace',
        },
        '& pre': {
          bgcolor: theme.palette.mode === 'dark' ? '#2D2926' : '#F0EDE8',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          overflowX: 'auto',
          my: 1.5,
          '& code': {
            bgcolor: 'transparent',
            px: 0,
            py: 0,
            fontSize: '0.875rem',
          },
        },
        '& ul, & ol': {
          color: 'text.primary',
          pl: 2.5,
          my: 1,
        },
        '& li': {
          my: 0.5,
        },
        '& strong': {
          color: 'text.primary',
          fontWeight: 600,
        },
        '& em': {
          color: 'text.primary',
        },
        '& blockquote': {
          borderLeft: 3,
          borderColor: 'primary.main',
          pl: 2,
          py: 0.5,
          my: 1.5,
          color: 'text.secondary',
          fontStyle: 'italic',
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, children, href, ...props }: any) => {
            return (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                {...props}
              >
                {children}
              </Link>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
