import { Login } from 'Login/Login';
import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTE_PARAM } from 'shared/constants/misc';
import { ProductPrint } from 'workorders/WorkorderItem/ProductPrint';
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
            children: [
              {
                element: <WorkorderItem />,
                index: true,
              },
              {
                path: `products_print/:${ROUTE_PARAM.PRODUCT_ID}`,
                element: <ProductPrint />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const AppRoutes = (): ReactNode => {
  return <RouterProvider router={router} />;
};
