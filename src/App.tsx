import { AppRoutes } from 'AppRoutes/AppRoutes';
import { QueryProvider } from 'providers/QueryProvider';
import { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const App = (): ReactElement => {
  return (
    <QueryProvider>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </QueryProvider>
  );
};
