import { Login } from 'Login/Login';
import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTE_PARAM } from 'shared/constants/misc';
import { WorkorderItem } from 'workorders/WorkorderItem/WorkorderItem';
import { WorkorderList } from 'workorders/WorkorderList/WorkorderList';
import { AppLayout } from './AppLayout';
import { ConfiguredErrorBoundary } from './ConfiguredErrorBoundary';
import { PrivateRoute } from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <ConfiguredErrorBoundary>
        <Login />
      </ConfiguredErrorBoundary>
    ),
  },
  {
    path: '/',
    element: (
      <ConfiguredErrorBoundary>
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      </ConfiguredErrorBoundary>
    ),
    children: [
      {
        path: 'workorders',
        children: [
          {
            element: <WorkorderList />,
            index: true,
          },
          {
            path: `:${ROUTE_PARAM.WORKORDER_ID}`,
            element: <WorkorderItem />,
          },
        ],
      },
    ],
  },
]);

export const AppRoutes = (): ReactNode => {
  return <RouterProvider router={router} />;
};
