import { Request } from 'express';

interface IUserControllerCheckRequest extends Request {
  user: {
    id: number;
    login: string;
    role: string;
  };
}

// TODO 1-add-todo-controller
type TDeviceControllerGetAllRequest = {
  brandId?: number;
  typeId?: number;
  limit?: number;
  page?: number;
};

// TODO: remove
type TDeviceControllerQueryParams = {
  brandId?: number;
  typeId?: number;
};

type IUserControllerRegistrationRequest = {
  login: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
};

export {
  IUserControllerCheckRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
  IUserControllerRegistrationRequest,
};
