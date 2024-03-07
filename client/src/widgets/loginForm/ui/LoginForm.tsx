import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { StoreContext } from '../../..';
import { ROUTE } from '../../../constants';
import { login, registration } from '../../../http/userAPI';
import { isEmailValid } from '../lib';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === ROUTE.LOGIN; // ROUTE.LOGIN = example.com/login
  const { userStore } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValidStatus, setEmailValidStatus] = useState<boolean>(false);

  const handleLoginClick = async () => {
    try {
      const user = isLoginRoute
        ? await login(email, password)
        : await registration(email, password);

      userStore.setUser(user);
      userStore.setIsAuth(true);
      navigate(ROUTE.MAIN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-alert
      alert((error as Error).message ?? 'An error ocurred');
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    setEmailValidStatus(isEmailValid(email));
  }, [email]);

  return (
    <div className={styles['login-form']}>
      <h3 className={styles.caption}>{isLoginRoute ? 'Authorization' : 'Registration'}</h3>
      <input
        className={`${styles.input} ${styles.mail}`}
        type="email"
        value={email}
        onChange={(e) => handleEmailInputChange(e)}
        placeholder="Email"
      />

      <input
        className={`${styles.input} ${styles.password}`}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button
        className={styles['login-button']}
        // TODO: color #6358DC to constants
        style={{
          backgroundColor: `${emailValidStatus && password.length > 0 ? '#6358DC' : 'gray'}`,
        }}
        type="button"
        onClick={handleLoginClick}
        disabled={!emailValidStatus || !(password.length > 0)}
      >
        {isLoginRoute ? 'Log In' : 'Register'}
      </button>

      {isLoginRoute ? (
        // if login route - show registration link
        <div className={styles['login-register']}>
          {"Don't have an account? "}
          <NavLink className={styles.link} to={ROUTE.REGISTRATION}>
            Register
          </NavLink>
        </div>
      ) : (
        // if other route - show log in link
        <div className={styles['login-register']}>
          {'Have an account? '}
          <NavLink className={styles.link} to={ROUTE.LOGIN}>
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
