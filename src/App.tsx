import { AppRoutes } from 'AppRoutes/AppRoutes';
import { QueryProvider } from 'providers/QueryProvider';
import { ReactElement } from 'react';
import './App.css';

export const App = (): ReactElement => {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
};
