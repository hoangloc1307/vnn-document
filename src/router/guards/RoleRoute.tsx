import { Navigate, Outlet } from 'react-router-dom';
import PATH from '~/constants/path';

export default function RoleRoute({
  allowedRoles = [],
  userRole,
}: {
  allowedRoles: string[];
  userRole: string;
}) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={PATH.FORBIDDEN} replace />;
  }

  return <Outlet />;
}
