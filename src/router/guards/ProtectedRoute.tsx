import { Navigate, Outlet, useLocation } from 'react-router';
import PATH from '~/constants/path';

export default function ProtectedRoute() {
  const isAuthenticated = true;
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={PATH.LOGIN} replace state={{ from: location }} />;

  return <Outlet />;
}
