import { Login } from 'Login/Login';
import { QueryProvider } from 'providers/QueryProvider';
import { ReactElement } from 'react';
import './App.css';

export const App = (): ReactElement => {
  return (
    <QueryProvider>
      <Login />
    </QueryProvider>
  );
};
