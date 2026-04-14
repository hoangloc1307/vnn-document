import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import PATHS from '~/constants/paths';
import { useAuthStore } from '~/stores/auth.store';

export default function ProtectedRoute() {
  const { isAuthenticated, menus, isInitialized } = useAuthStore(
    useShallow((s) => ({
      isAuthenticated: s.isAuthenticated,
      menus: s.menus,
      isInitialized: s.isInitialized,
    })),
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;
  }

  if (location.pathname !== PATHS.HOME && isInitialized && !menus.includes(location.pathname)) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <Outlet />;
}
