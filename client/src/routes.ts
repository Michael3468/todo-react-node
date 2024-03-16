import React from 'react';

import { ROUTE } from './constants';
import { Auth, Main } from './pages';

type TRoute = {
  path: string;
  Component: React.ComponentType;
};

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

// eslint-disable-next-line import/prefer-default-export
export { publicRoutes };
