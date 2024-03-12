import { Model } from 'sequelize';

import { TTodoPriority, TTodoStatus } from './todo.constants';

interface ITodoAttributes {
  id: number;
  caption: string;
  description: string;
  finishDate: Date;
  priority: TTodoPriority;
  status: TTodoStatus;
  creator: string;
  responsible: string;
}

interface ITodo extends ITodoAttributes, Model {}

export type { ITodo, ITodoAttributes };
