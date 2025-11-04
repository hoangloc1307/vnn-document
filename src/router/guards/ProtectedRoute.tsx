import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PATH from '~/constants/path';
import { useAuthStore } from '~/stores/auth.store';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={PATH.LOGIN} replace state={{ from: location }} />;

  return <Outlet />;
}
