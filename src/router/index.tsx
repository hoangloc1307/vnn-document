import { createBrowserRouter } from 'react-router-dom';
import PATHS from '~/constants/paths';
import SidebarLayout from '~/layouts/sidebar';
import AdminPage from '~/pages/admin';
import LoginPage from '~/pages/auth/login';
import DashboardPage from '~/pages/dashboard';
import ProtectedRoute from '~/router/guards/ProtectedRoute';
import RejectedRoute from '~/router/guards/RejectedRoute';
import RoleRoute from '~/router/guards/RoleRoute';

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
            path: '/',
            element: <DashboardPage />,
          },
          // =============== ADMIN ROUTE ===============
          {
            element: <RoleRoute allowedRoles={['admin']} userRole={'test'} />,
            children: [
              {
                path: PATHS.ADMIN,
                element: <AdminPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
