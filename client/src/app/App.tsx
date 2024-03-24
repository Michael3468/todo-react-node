import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import { StoreContext } from '..';

import { check } from '../http/userAPI';
import { AppRouter } from '../shared/ui';
import { Header } from '../widgets';

import './main.scss';

const App = observer(() => {
  const { userStore } = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    check()
      .then((user) => {
        userStore.setUser(user);
        userStore.setIsAuth(true);
      })
      .catch((error) => {
        const { message } = error.response.data;
        // eslint-disable-next-line no-console
        console.error(message);

        if (message === 'jwt expired') {
          localStorage.removeItem('token');
        }
      })
      .finally(() => setLoading(false));
  }, [userStore]);

  // TODO refactor
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
