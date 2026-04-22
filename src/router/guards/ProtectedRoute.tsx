import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
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

  const isAllowed = menus.some((menu) => matchPath({ path: menu, end: false }, location.pathname));

  if (location.pathname !== PATHS.HOME && isInitialized && !isAllowed) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <Outlet />;
}
