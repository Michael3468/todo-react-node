import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdLogOut } from 'react-icons/io';

import { StoreContext } from '../../../../index';
import { mainTheme } from '../../../../shared/model/constants';
import styles from './LogoutButton.module.scss';

const LogoutButton = () => {
  const { userStore, todoStore } = useContext(StoreContext);

  const handleLogOutButton = () => {
    userStore.setUser(null);
    userStore.setIsAuth(false);
    localStorage.removeItem('token');

    todoStore.clearTodos();
  };

  return (
    <Button variant="outline-light" className="border-0" onClick={handleLogOutButton}>
      <IoMdLogOut className={`${styles.icon}`} style={{ fontSize: mainTheme.navbarIcon.size }} />
      <span className={`${styles.text}`}>Logout</span>
    </Button>
  );
};

export default LogoutButton;
