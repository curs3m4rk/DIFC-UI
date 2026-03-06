import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // WHY aliases?
      // Instead of: import X from '../../../components/Button'
      // You write:  import X from '@/components/Button'
      // Works from any file depth, no counting ../../../
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,

    // WHY proxy?
    // In dev, your React app is on :3000 and .NET API on :7055
    // Without proxy, browser blocks cross-origin requests (CORS).
    // Proxy makes React dev server forward /api calls to .NET.
    // In production, Nginx handles this — proxy is dev-only.
    proxy: {
      '/api': {
        target: 'https://localhost:7055',
        changeOrigin: true,
        secure: false, // allow self-signed cert in dev
      },
    },
  },

  build: {
    outDir: 'dist',          // output folder for production build
    sourcemap: false,         // disable sourcemaps in prod (security)
    chunkSizeWarningLimit: 1000,
  },
});