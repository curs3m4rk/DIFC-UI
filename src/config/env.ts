// src/config/env.ts
// Centralised access — if variable name changes, fix in ONE place

const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appName: import.meta.env.VITE_APP_NAME as string,
  isDev: import.meta.env.VITE_ENV === 'development',
  isProd: import.meta.env.VITE_ENV === 'production',
};

// Validate on startup — crash early if config is wrong
// rather than mysterious failures in production
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined || value === '') {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export default env;