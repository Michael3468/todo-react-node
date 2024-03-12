import { Router } from 'express';

import { USER_ROLE } from '../constants';
import { TodoController } from '../controllers';
import checkRole from '../middleware/checkRoleMiddleware';

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.post('/', checkRole(USER_ROLE.ADMIN), todoController.create);
todoRouter.get('/', todoController.getAll);
todoRouter.get('/:id', todoController.getOne);

export default todoRouter;
