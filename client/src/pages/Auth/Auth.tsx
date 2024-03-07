import { observer } from 'mobx-react-lite';

import LoginForm from '../../widgets';
import styles from './Auth.module.scss';

const Auth = observer(() => (
  <div className={styles['login-form']}>
    <LoginForm />
  </div>
));

export default Auth;
