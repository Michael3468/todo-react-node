import { DataTypes } from 'sequelize';

import { USER_ROLE } from '../constants';
import sequelize from '../db';
import { IUser, IUserAttributes, ITodo, ITodoAttributes } from './types';

const User = sequelize.define<IUser, IUserAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: USER_ROLE.USER },
});

// TODO move to var 'todo', 'in process', 'done', 'canceled'
const Todo = sequelize.define<ITodo, ITodoAttributes>('todo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING, unique: false, allowNull: true },

  finishDate: { type: DataTypes.DATE, unique: false, allowNull: false },
  priority: {
    type: DataTypes.ENUM('todo', 'in process', 'done', 'canceled'),
    unique: false,
    allowNull: false,
  },
  creator: { type: DataTypes.STRING, unique: false, allowNull: false },
  responsible: { type: DataTypes.STRING, unique: false, allowNull: false },
});

export { User, Todo };
