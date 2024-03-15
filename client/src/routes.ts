import React from 'react';

import { ROUTE } from './constants';
import { Admin, Auth, Main } from './pages';

type TRoute = {
  path: string;
  Component: React.ComponentType;
};

const authRoutes: TRoute[] = [
  {
    path: ROUTE.ADMIN,
    Component: Admin,
  },
];

const publicRoutes: TRoute[] = [
  {
    path: ROUTE.MAIN,
    Component: Main,
  },
  {
    path: ROUTE.LOGIN,
    Component: Auth,
  },
  {
    path: ROUTE.REGISTRATION,
    Component: Auth,
  },
];

export { authRoutes, publicRoutes };
