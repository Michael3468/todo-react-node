import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';

import { publicRoutes } from '../routes';

const AppRouter = observer(() => (
  <Routes>
    {publicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
));

export default AppRouter;
