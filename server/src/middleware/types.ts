import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

interface ICheckAuthMiddlewareRequest extends Request {
  user: Jwt | null;
}

interface ICheckRoleMiddlewareRequest extends Request {
  user: Jwt | null;
}

export { ICheckAuthMiddlewareRequest, ICheckRoleMiddlewareRequest };
