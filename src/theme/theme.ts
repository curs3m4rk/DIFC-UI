import { createTheme } from '@mui/material';

/**
 * Creates the MUI theme.
 *
 * WHY accept a mode parameter?
 * We detect the user's system preference (dark/light) in main.tsx
 * and pass it here. MUI then automatically switches ALL component
 * colours — backgrounds, text, inputs, cards — everything.
 * You never manually style dark mode yourself.
 */
const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode, // ← this single field switches the entire theme
      primary: {
        main: '#1565C0',
        light: '#1976D2',
        dark: '#0D47A1',
      },
      secondary: {
        main: '#455A64',
      },
      // In dark mode MUI overrides background automatically,
      // but we can fine-tune if needed:
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#121212',
        paper:   mode === 'light' ? '#FFFFFF'  : '#1E1E1E',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
        },
      },
    },
  });

export default getTheme;