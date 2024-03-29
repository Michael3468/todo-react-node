import jwtDecode from 'jwt-decode';

import { IUser } from '../types';
import { $authHost, $host } from './AxiosInstanses';

const registration = async (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  supervisor: string,
): Promise<IUser> => {
  const { data } = await $host.post('api/user/registration', {
    login,
    password,
    firstName,
    lastName,
    patronymic,
    supervisor,
  });

  localStorage.setItem('token', data.token);

  return jwtDecode(data.token);
};

// eslint-disable-next-line no-shadow
const login = async (login: string, password: string): Promise<IUser> => {
  const { data } = await $host.post('api/user/login', { login, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const check = async (): Promise<IUser> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const getAllUsers = async (): Promise<IUser[]> => {
  const { data } = await $host.get('api/user/get-all-users');
  return data.users;
};

export { registration, login, check, getAllUsers };
