import { Navigate, Outlet } from 'react-router-dom';
import PATHS from '~/constants/paths';

export default function RoleRoute({
  allowedRoles = [],
  userRole,
}: {
  allowedRoles: string[];
  userRole: string;
}) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={PATHS.FORBIDDEN} replace />;
  }

  return <Outlet />;
}
