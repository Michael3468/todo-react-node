import { Router } from 'express';

import { USER_ROLE } from '../constants';
import { TodoController } from '../controllers';
import checkRole from '../middleware/checkRoleMiddleware';

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.post('/', checkRole(USER_ROLE.USER), todoController.create);
todoRouter.patch('/', todoController.update);
todoRouter.get('/', todoController.getAll);

export default todoRouter;
