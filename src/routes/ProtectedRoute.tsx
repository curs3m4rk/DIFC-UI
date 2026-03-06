import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface Props {
  children?: React.ReactElement;
  requiredRole?: string;
}

/**
 * Guards any route that requires authentication.
 *
 * Two ways it's used:
 * 1. As a layout wrapper (no children) → uses <Outlet />
 *    so nested routes render inside it
 * 2. Wrapping a specific page (with children) → renders children directly
 *
 * If not authenticated  → redirect to /login
 * If missing role       → redirect to /unauthorized
 */
export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { accessToken, user } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ?? <Outlet />;
}