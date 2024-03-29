import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { IUserControllerCheckRequest, IUserControllerRegistrationRequest } from '.';
import ApiError from '../../error/ApiError';
import { User } from '../../models';

const generateJwt = (id: number, login: string): string =>
  jwt.sign({ id, login }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        login,
        password,
        firstName,
        lastName,
        patronymic,
        supervisor,
      }: IUserControllerRegistrationRequest = req.body;
      if (!login || !password) {
        return next(ApiError.badRequest({ message: 'Incorrect login or password' }));
      }

      const candidate = await User.findOne({ where: { login } });
      if (candidate) {
        return next(ApiError.badRequest({ message: 'User with this login already exists' }));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        login,
        password: hashPassword,
        firstName,
        lastName,
        patronymic,
        supervisor,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const token = generateJwt(user.id, user.login);

      return res.json({ token, userId: user.id });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ where: { login } });
      if (!user) {
        return next(ApiError.badRequest({ message: 'User not found' }));
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return next(ApiError.badRequest({ message: 'Password is not correct' }));
      }

      const token = generateJwt(user.id, user.login);
      return res.json({ token, userId: user.id });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id, login } = (req as IUserControllerCheckRequest).user;
      const token = generateJwt(id, login);
      return res.json({ token });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await User.findAll();

      const modifiedUsers = users.map((user) => ({
        id: user.id,
        login: user.login,
        supervisor: user.supervisor,
      }));

      return res.json({ users: modifiedUsers });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }
}

export default UserController;
