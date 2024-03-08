import { DataTypes } from 'sequelize';

import { ITodo, ITodoAttributes } from '.';
import sequelize from '../../db';
import { TodoPriorities, TodoStatuses } from './todo.constants';

const Todo = sequelize.define<ITodo, ITodoAttributes>('todo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING, unique: false, allowNull: true },

  finishDate: { type: DataTypes.DATE, unique: false, allowNull: false },
  priority: { type: DataTypes.ENUM(...TodoPriorities), unique: false, allowNull: false },
  status: {
    type: DataTypes.ENUM(...TodoStatuses),
    unique: false,
    allowNull: false,
  },
  creator: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  responsible: { type: DataTypes.INTEGER, unique: false, allowNull: false },
});

export default Todo;
