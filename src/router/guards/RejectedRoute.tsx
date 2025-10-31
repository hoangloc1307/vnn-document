import { Navigate, Outlet } from 'react-router';
import PATH from '~/constants/path';

export default function RejectedRoute() {
  const isAuthenticated = true;

  if (isAuthenticated) return <Navigate to={PATH.HOME} />;

  return <Outlet />;
}
