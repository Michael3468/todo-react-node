import jwtDecode from 'jwt-decode';

import { $authHost, $host } from '.';
import { USER_ROLE } from '../constants';
import { IUser } from '../types';

const registration = async (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  patronymic: string,
): Promise<IUser> => {
  const { data } = await $host.post('api/user/registration', {
    login,
    password,
    role: USER_ROLE.USER,
    firstName,
    lastName,
    patronymic,
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

export { registration, login, check };
