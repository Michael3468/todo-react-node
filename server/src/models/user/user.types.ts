import { Model } from 'sequelize';

interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  supervisor: string;
}
interface IUser extends IUserAttributes, Model {}

export type { IUser, IUserAttributes };
