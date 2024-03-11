import { DataTypes } from 'sequelize';

import { IUser, IUserAttributes } from '.';
import { USER_ROLE } from '../../constants';
import sequelize from '../../db';

/**
 * TODO add info about change ADMIN role in database to readme
 */
const User = sequelize.define<IUser, IUserAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: USER_ROLE.USER },
  name: { type: DataTypes.STRING, unique: false },
  lastName: { type: DataTypes.STRING, unique: false },
  patronymic: { type: DataTypes.STRING, unique: false },
  supervisor: { type: DataTypes.INTEGER, unique: false },
});

export default User;
