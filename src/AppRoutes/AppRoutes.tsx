import { Login } from 'Login/Login';
import { WorkorderList } from 'WorkorderList/WorkorderList';
import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
        element: <WorkorderList />,
      },
      //   {
      //     path: 'workorders/:id',
      //     element: <WorkorderItem />,
      //   },
    ],
  },
]);

export const AppRoutes = (): ReactNode => {
  return <RouterProvider router={router} />;
};
