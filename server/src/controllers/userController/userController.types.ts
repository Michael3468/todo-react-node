import { Request } from 'express';

interface IUserControllerCheckRequest extends Request {
  user: {
    id: number;
    login: string;
    role: string;
  };
}

interface IUserControllerRegistrationRequest {
  login: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  supervisor: string;
}

export type { IUserControllerCheckRequest, IUserControllerRegistrationRequest };
