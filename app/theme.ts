'use client';
import { Roboto } from 'next/font/google';
import { createTheme as createThemeMui } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const theme = createThemeMui({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa'
          })
        })
      }
    }
  }
});
