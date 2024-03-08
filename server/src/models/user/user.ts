import { DataTypes } from 'sequelize';

import { IUser, IUserAttributes } from '.';
import { USER_ROLE } from '../../constants';
import sequelize from '../../db';

const User = sequelize.define<IUser, IUserAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: USER_ROLE.USER },
});

export default User;
