import TodoController, {
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
} from './todoController';
import UserController, {
  IUserControllerCheckRequest,
  IUserControllerRegistrationRequest,
} from './userController';

export type {
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
  IUserControllerCheckRequest,
  IUserControllerRegistrationRequest,
};
export { UserController, TodoController };
