import { Request, Response, NextFunction } from 'express';

// TODO check TDeviceControllerGetAllRequest and TDeviceControllerQueryParams types
import { TDeviceControllerGetAllRequest, TDeviceControllerQueryParams } from '.';
import ApiError from '../../error/ApiError';
import { Todo } from '../../models';
import { ITodoAttributes, ITodo } from '../../types';

class TodoController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // eslint-disable-next-line operator-linebreak
      const { caption, description, finishDate, priority, creator, responsible }: ITodoAttributes =
        req.body;

      const todo: ITodo = await Todo.create({
        caption,
        description,
        finishDate,
        priority,
        creator,
        responsible,
      });

      return res.json(todo);
    } catch (error) {
      return next(ApiError.badRequest({ error: error as Error }));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const DEVICES_ON_PAGE = 10;
      const {
        brandId,
        typeId,
        limit = DEVICES_ON_PAGE,
        page = 1,
      }: TDeviceControllerGetAllRequest = req.query;
      const offset = page * limit - limit;

      const queryParams: TDeviceControllerQueryParams = {};
      if (brandId) queryParams.brandId = brandId;
      if (typeId) queryParams.typeId = typeId;

      const todos = await Todo.findAndCountAll({ where: queryParams, limit, offset });

      return res.json(todos);
    } catch (error) {
      return next(ApiError.internal({ error: error as Error }));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({
        where: { id },
        // include: [{ model: DeviceInfo, as: 'info' }],
      });

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.json(todo);
    } catch (error) {
      return next(ApiError.internal({ error: error as Error }));
    }
  }
}

export default TodoController;
