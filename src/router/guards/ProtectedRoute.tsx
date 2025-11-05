import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PATHS from '~/constants/paths';
import { useAuthStore } from '~/stores/auth.store';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;

  return <Outlet />;
}
