import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import UnauthorizedPage from '@/pages/errors/UnauthorizedPage';
import AdminRoutes from '@/pages/admin/AdminRoutes';

/**
 * All app routes defined in one place.
 *
 * Structure:
 * /login            → public
 * /unauthorized     → public
 * /                 → protected (redirects to /dashboard)
 * /dashboard        → protected (any logged-in user)
 * /admin/*          → protected (Admin role only)
 * *                 → 404
 *
 * AppLayout wraps all protected routes so every page
 * automatically gets the sidebar + topbar.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public routes ──────────────────────────────── */}
      <Route path="/login"        element={<LoginPage />} />
      <Route path="/signup"       element={<SignupPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ── Protected routes (requires login) ──────────── */}
      {/* ProtectedRoute with no children uses <Outlet />  */}
      {/* so AppLayout renders, and nested routes fill it  */}
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        {/* Default → dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Admin-only section */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="Admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Route>

      {/* ── 404 ────────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
