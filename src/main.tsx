import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import getTheme from './theme/theme';

/**
 * useMediaQuery('(prefers-color-scheme: dark)') reads the OS setting.
 * Windows dark mode ON  → prefersDark = true  → theme mode = 'dark'
 * Windows dark mode OFF → prefersDark = false → theme mode = 'light'
 *
 * CssBaseline applies a CSS reset AND sets the background colour
 * from the theme — so the whole page background switches correctly.
 *
 * WHY a wrapper component?
 * useMediaQuery is a React hook — hooks can only run inside
 * a React component, not at the top level of main.tsx.
 * So we wrap everything in <Root /> which is a proper component.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Root() {
  // Reads system dark/light preference — updates automatically
  // if the user changes their OS theme while the app is open
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = getTheme(prefersDark ? 'dark' : 'light');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/*
          CssBaseline does two things:
          1. CSS reset — removes browser default margins/padding
          2. Sets body background to theme.palette.background.default
             so dark mode background covers the whole page
        */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);