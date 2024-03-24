import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { StoreContext } from '../../index';
import { ROUTE, mainTheme } from '../../shared/model/constants';
import { LoginButton, LogoutButton } from './ui';

const Header = observer(() => {
  const { userStore } = useContext(StoreContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={ROUTE.MAIN} style={{ color: mainTheme.link.color }}>
          E-SOFT
        </NavLink>

        {userStore.isAuth ? (
          <>
            <p style={{ color: mainTheme.link.color, margin: 0 }}>{userStore.user?.login}</p>
            <Nav style={{ color: mainTheme.link.color }}>
              <LogoutButton />
            </Nav>
          </>
        ) : (
          <Nav style={{ color: mainTheme.link.color }}>
            <LoginButton />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Header;
