import { USER_ROLE } from '../constants';

type TUserRole = typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;

interface IUser {
  id: number;
  login: string;
  password: string;
  role: TUserRole;
  name: string;
  lastName: string;
  patronymic: string;
}

export type { IUser, TUserRole };
