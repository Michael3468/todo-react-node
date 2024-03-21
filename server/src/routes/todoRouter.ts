import { Router } from 'express';

import { TodoController } from '../controllers';
import checkRole from '../middleware/checkRoleMiddleware';

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.post('/', checkRole(), todoController.create);
todoRouter.patch('/', todoController.update);
todoRouter.get('/', todoController.getAll);

export default todoRouter;
