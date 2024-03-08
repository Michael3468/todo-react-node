import { Model } from 'sequelize';

import { TodoPriority, TodoStatus } from './todo.constants';

interface ITodoAttributes {
  id: number;
  caption: string;
  description: string;
  finishDate: Date;
  priority: TodoPriority;
  status: TodoStatus;
  creator: string;
  responsible: string;
}

interface ITodo extends ITodoAttributes, Model {}

export type { ITodo, ITodoAttributes };
