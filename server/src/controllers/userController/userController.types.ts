import { Request } from 'express';

interface IUserControllerCheckRequest extends Request {
  user: {
    id: number;
    login: string;
    role: string;
  };
}

type IUserControllerRegistrationRequest = {
  login: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
};

export type { IUserControllerCheckRequest, IUserControllerRegistrationRequest };
