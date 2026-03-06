import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

/**
 * Single Axios instance used for ALL API calls in the app.
 *
 * Configured once here with:
 * - Base URL from environment variable
 * - withCredentials: true → sends HttpOnly cookie on every request
 * - Request interceptor → auto-injects Bearer token
 * - Response interceptor → silently refreshes expired token and retries
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7055/api',
  withCredentials: true, // REQUIRED: sends the HttpOnly refreshToken cookie
});

// ── REQUEST INTERCEPTOR ────────────────────────────────────────────────
// Runs before every outgoing request.
// Reads accessToken from Zustand memory and injects it as Bearer header.
// Components never manually add Authorization headers.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── RESPONSE INTERCEPTOR ───────────────────────────────────────────────
// Runs when every response comes back.
// If 401 (token expired) → call /auth/refresh → update store → retry.
// User never sees the error — it's completely transparent.

let isRefreshing = false;

// Queue of requests that failed while a refresh was already in progress.
// Once refresh completes, we replay them all with the new token.
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  // Success responses pass straight through
  (response) => response,

  async (error) => {
    const original = error.config;

    // Only attempt refresh on 401 and only once per request (_retry flag)
    if (error.response?.status === 401 && !original._retry) {

      // If a refresh is already happening, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const currentToken = useAuthStore.getState().accessToken;

        // Call refresh — cookie sent automatically (withCredentials)
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7000/api'}/auth/refresh`,
          { accessToken: currentToken },
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        // Update store with new access token
        const currentUser = useAuthStore.getState().user!;
        useAuthStore.getState().setAuth(newToken, currentUser);

        // Replay all queued requests
        processQueue(null, newToken);

        // Retry the original request
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);

      } catch (refreshError) {
        // Refresh failed (refresh token expired) → force logout
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;