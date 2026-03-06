// src/theme/theme.ts
import { createTheme } from '@mui/material';

/**
 * One central theme for the entire app.
 * Change primary colour here → updates everywhere.
 * Govt apps typically use blue/grey palettes.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0',    // Govt blue
      light: '#1976D2',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#455A64',    // Steel grey
    },
    background: {
      default: '#F5F5F5', // Light grey page bg
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
    // Override default MUI button style globally
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' }, // No ALL CAPS on buttons
      },
    },
  },
});

export default theme;