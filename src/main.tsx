// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import theme from './theme/theme';
import './index.css';

/**
 * Providers wrap the entire app — order matters:
 * QueryClient  → server state (API calls, caching)
 * ThemeProvider → MUI theming
 * CssBaseline  → CSS reset (consistent look across browsers)
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,           // retry failed requests once
      staleTime: 5 * 60 * 1000, // cache data for 5 min
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);