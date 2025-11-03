import { Navigate, Outlet } from 'react-router';
import PATH from '~/constants/path';
import { useAuthStore } from '~/stores/auth.store';

export default function RejectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to={PATH.HOME} />;

  return <Outlet />;
}
