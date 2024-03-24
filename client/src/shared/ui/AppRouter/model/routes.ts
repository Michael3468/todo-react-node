import React from 'react';

import { Auth, Main } from '../../../../pages';
import { ROUTE } from '../../../model/constants';

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

export default publicRoutes;
