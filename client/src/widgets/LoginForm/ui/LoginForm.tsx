import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { StoreContext } from '../../..';
import { getAllUsers, login, registration } from '../../../shared/api';
import { ROUTE } from '../../../shared/model/constants';
import { RDropdown } from '../../../shared/ui';
import { isEmailValid } from '../lib';
import styles from './LoginForm.module.scss';

interface ErrorResponse {
  message: string;
}

const LoginForm = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === ROUTE.LOGIN; // ROUTE.LOGIN = example.com/login
  const { userStore } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [emailValidStatus, setEmailValidStatus] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const [authLoginError, setAuthLoginError] = useState<string>('');
  const [responsibles, setResponsibles] = useState<string[]>([]);
  const [supervisor, setSupervisor] = useState<string>('');

  const handleLoginClick = async () => {
    try {
      const user = isLoginRoute
        ? await login(email, password)
        : await registration(email, password, firstName, lastName, patronymic, supervisor);

      userStore.setUser(user);
      userStore.setIsAuth(true);
      navigate(ROUTE.MAIN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      const { response } = error as AxiosError<ErrorResponse>;
      setAuthLoginError(response?.data.message || 'An error ocurred');
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        const resp = users.map((user) => user.login);
        if (resp) {
          setResponsibles(resp);
        }
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setEmailValidStatus(isEmailValid(email));
  }, [email]);

  useEffect(() => {
    if (
      // is login form filled
      (isLoginRoute && emailValidStatus && !!password) ||
      // is registration form filled
      (!isLoginRoute && emailValidStatus && !!password && !!firstName && !!lastName && !!patronymic)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [emailValidStatus, password, firstName, lastName, patronymic, isLoginRoute]);

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
      <div className={styles.error}>{authLoginError}</div>

      {!isLoginRoute && (
        <>
          <input
            className={`${styles.input} ${styles.text}`}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />

          <input
            className={`${styles.input} ${styles.text}`}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />

          <input
            className={`${styles.input} ${styles.text}`}
            type="text"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            placeholder="Patronymic Name"
          />

          <RDropdown
            variable={supervisor}
            setVariable={setSupervisor}
            toggleText="Supervisor"
            itemsArray={[...responsibles]}
          />
        </>
      )}

      <button
        className={styles['login-button']}
        // TODO: color #6358DC to constants
        style={{
          backgroundColor: `${isButtonDisabled ? 'gray' : '#6358DC'}`,
        }}
        type="button"
        onClick={handleLoginClick}
        disabled={isButtonDisabled}
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
