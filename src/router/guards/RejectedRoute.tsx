import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PATHS from '~/constants/paths';
import { useAuthStore } from '~/stores/auth.store';

export default function RejectedRoute() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    const to = location.state?.from?.pathname ?? PATHS.HOME;
    return <Navigate to={to} replace />;
  }

  return <Outlet />;
}
