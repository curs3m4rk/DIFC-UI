import api from '@/api/axiosInstance';
import { useAuthStore } from '@/store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Exposes login and logout actions to any component.
 * Components never touch Axios or Zustand directly —
 * they just call useAuth() and get clean functions.
 */
export const useAuth = () => {
  const { setAuth, clearAuth } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    // POST /api/auth/login
    // Server returns accessToken in JSON body
    // Server sets refreshToken as HttpOnly cookie automatically
    const response = await api.post('/auth/login', credentials);
    const { accessToken, userId, email, userName, roles } = response.data;

    setAuth(accessToken, { userId, email, userName, roles });

    return response.data;
  };

  const logout = async () => {
    try {
      // POST /api/auth/logout
      // Bearer token injected by Axios interceptor
      // refreshToken cookie sent automatically by browser
      await api.post('/auth/logout');
    } finally {
      // Always clear local state even if the API call fails
      clearAuth();
    }
  };

  return { login, logout };
};