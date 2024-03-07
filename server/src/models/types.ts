import { Model } from 'sequelize';

interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
}
interface IUser extends IUserAttributes, Model {}

interface ITodoAttributes {
  id: number;
  caption: string;
  description: string;
  finishDate: Date;
  priority: 'todo' | 'in process' | 'done' | 'canceled';
  creator: string;
  responsible: string;
}

interface ITodo extends ITodoAttributes, Model {}

export {
  IUser,
  IUserAttributes,
  ITodo,
  ITodoAttributes,
};
