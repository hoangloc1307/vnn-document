import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PATHS from '~/constants/paths';
import SidebarLayout from '~/layouts/sidebar';
import ProtectedRoute from '~/router/guards/ProtectedRoute';
import RejectedRoute from '~/router/guards/RejectedRoute';

const DashboardPage = lazy(() => import('~/pages/dashboard'));
const ImportPage = lazy(() => import('~/pages/import'));
const ItemsPage = lazy(() => import('~/pages/items'));
const NotFoundPage = lazy(() => import('~/pages/not-found'));
const SupportPage = lazy(() => import('~/pages/support'));
const VersionPage = lazy(() => import('~/pages/version'));
const WarehousesPage = lazy(() => import('~/pages/warehouses'));
const ZonesPage = lazy(() => import('~/pages/zones'));
const LoginPage = lazy(() => import('~/pages/auth/login'));

const router = createBrowserRouter([
  // =============== REJECTED ROUTE ===============
  {
    element: <RejectedRoute />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
    ],
  },

  // =============== PROTECTED ROUTE ===============
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: PATHS.ITEMS,
            element: <ItemsPage />,
          },
          {
            path: PATHS.WAREHOUSES,
            element: <WarehousesPage />,
          },
          {
            path: PATHS.ZONES,
            element: <ZonesPage />,
          },
          {
            path: `${PATHS.IMPORT}/:id`,
            element: <ImportPage />,
          },
        ],
      },
    ],
  },

  // =============== PUBLIC ROUTE ===============
  {
    element: <SidebarLayout />,
    children: [
      {
        path: PATHS.VERSION,
        element: <VersionPage />,
      },
      {
        path: PATHS.SUPPORT,
        element: <SupportPage />,
      },
    ],
  },

  // =============== NOT FOUND ROUTE ===============
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
