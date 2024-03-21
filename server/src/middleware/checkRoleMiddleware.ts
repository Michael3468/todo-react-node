import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import ApiError from '../error/ApiError';
import { ICheckRoleMiddlewareRequest } from './types';

function checkRole() {
  return function check(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      (req as ICheckRoleMiddlewareRequest).user = decoded as Jwt;
      return next();
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  };
}

export default checkRole;
