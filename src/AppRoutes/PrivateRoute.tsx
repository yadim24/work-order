import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenStore } from 'shared/token';

type PrivateRouteType = {
  children: ReactNode;
};

export const PrivateRoute: FC<PrivateRouteType> = ({ children }) => {
  return tokenStore.getToken() ? children : <Navigate to="/login" />;
};
