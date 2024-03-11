import { USER_ROLE } from '../constants';

// TODO remove DeviceInfo
interface IDeviceInfo {
  id: number;
  title: string;
  description: string;
}
interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  info?: IDeviceInfo[];
  typeId: number;
  brandId: number;
  cartId: number;
}

type TUserRole = typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;

interface IUser {
  id: number;
  email: string;
  password: string;
  role: TUserRole;
  name: string;
  lastName: string;
  patronymic: string;
}

export type { IDevice, IDeviceInfo, IUser, TUserRole };
