import { createBrowserRouter } from 'react-router-dom';
import PATHS from '~/constants/paths';
import SidebarLayout from '~/layouts/sidebar';
import LoginPage from '~/pages/auth/login';
import DashboardPage from '~/pages/dashboard';
import Items from '~/pages/items';
import NotFoundPage from '~/pages/not-found';
import SupportPage from '~/pages/support';
import VersonPage from '~/pages/version';
import Warehouses from '~/pages/warehouses';
import ProtectedRoute from '~/router/guards/ProtectedRoute';
import RejectedRoute from '~/router/guards/RejectedRoute';

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
            element: <Items />,
          },
          {
            path: PATHS.WAREHOUSES,
            element: <Warehouses />,
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
        element: <VersonPage />,
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
