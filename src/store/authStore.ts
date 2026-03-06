import { create } from 'zustand';

interface User {
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
}

interface AuthState {
  accessToken: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

/**
 * Global auth state using Zustand.
 *
 * accessToken → stored in MEMORY only (not localStorage)
 *               safe from XSS attacks
 *               lost on page refresh → that's intentional;
 *               user will auto-refresh via the cookie
 *
 * refreshToken → NOT stored here at all.
 *                The server sets it as an HttpOnly cookie.
 *                Browser sends it automatically on every request.
 *                JS cannot read or steal it.
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (token, user) => set({ accessToken: token, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));