import { Request } from 'express';

interface IUserControllerCheckRequest extends Request {
  user: {
    id: number;
    login: string;
  };
}

interface IUserControllerRegistrationRequest {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  supervisor: string;
}

export type { IUserControllerCheckRequest, IUserControllerRegistrationRequest };
