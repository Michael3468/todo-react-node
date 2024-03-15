import { Request, Response, NextFunction } from 'express';

import ApiError from '../../error/ApiError';
import { Todo } from '../../models';
import { ITodo } from '../../types';

class TodoController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // eslint-disable-next-line operator-linebreak
      const {
        caption,
        description,
        finishDate,
        priority,
        status,
        creator,
        responsible,
      }: ITodo = req.body;

      const todo: ITodo = await Todo.create({
        caption,
        description,
        finishDate,
        priority,
        status,
        creator,
        responsible,
      });

      return res.json(todo);
    } catch (error) {
      return next(ApiError.badRequest({ error: error as Error }));
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        id,
        caption,
        description,
        finishDate,
        priority,
        status,
        creator,
        responsible,
      }: ITodo = req.body;

      const [updatedRowsCount, updatedTodo]: [number, ITodo[]] = await Todo.update(
        {
          caption,
          description,
          finishDate,
          priority,
          status,
          creator,
          responsible,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedRowsCount === 0) {
        return next(ApiError.badRequest({ message: 'Todo not found' }));
      }

      return res.json(updatedTodo[0]);
    } catch (error) {
      return next(ApiError.badRequest({ error: error as Error }));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const todos = await Todo.findAll();

      return res.json(todos);
    } catch (error) {
      return next(ApiError.internal({ error: error as Error }));
    }
  }
}

export default TodoController;
