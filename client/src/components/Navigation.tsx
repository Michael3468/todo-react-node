import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { USER_ROLE, ROUTE, mainTheme } from '../constants';
import { StoreContext } from '../index';
import AdminPanelButton from './AdminPanelButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navigation = observer(() => {
  const { userStore } = useContext(StoreContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={ROUTE.MAIN} style={{ color: mainTheme.link.color }}>
          E-SOFT
        </NavLink>

        {userStore.isAuth ? (
          <Nav style={{ color: mainTheme.link.color }}>
            {userStore.user?.role === USER_ROLE.ADMIN && <AdminPanelButton />}
            <LogoutButton />
          </Nav>
        ) : (
          <Nav style={{ color: mainTheme.link.color }}>
            <LoginButton />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Navigation;
