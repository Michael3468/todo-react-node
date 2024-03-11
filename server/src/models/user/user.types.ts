import { Model } from 'sequelize';

interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
  name: string;
  lastName: string;
  patronymic: string;
  supervisor: number;
}
interface IUser extends IUserAttributes, Model {}

export type { IUser, IUserAttributes };
