'use client';

import { createTheme } from '@mui/material/styles';

// Claude-inspired color palette (3 colori principali)
const COLORS = {
  // Color 1: Warm Cream/Beige - Background principale
  cream: '#F7F5F2',
  creamDark: '#1A1816',

  // Color 2: Warm Copper/Orange - Accent/Primary
  copper: '#E07B4F',
  copperLight: '#FFE8D9',
  copperDark: '#C46A4F',

  // Color 3: Warm Dark Brown - Text principale
  brown: '#2C2822',
  brownLight: '#6B6560',
  brownDark: '#E8E5E1',
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.copper,
      light: COLORS.copperLight,
      dark: COLORS.copperDark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: COLORS.cream,
      paper: '#FFFFFF',
    },
    text: {
      primary: COLORS.brown,
      secondary: COLORS.brownLight,
    },
    divider: '#E6E2DD',
  },
  typography: {
    fontFamily: [
      'var(--font-geist-sans)',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.9375rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid #E6E2DD',
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.copper,
      light: COLORS.copperLight,
      dark: COLORS.copperDark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: COLORS.creamDark,
      paper: '#252220',
    },
    text: {
      primary: COLORS.brownDark,
      secondary: '#A8A39E',
    },
    divider: '#3A3632',
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  components: lightTheme.components,
});
