import { $host, $authHost } from '.';
// TODO rename to ITodo
import { IDevice } from '../types';

// TODO interfaces
interface IFetchDevicesParams {
  typeId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
}

interface IDevices {
  count: number;
  rows: IDevice[];
}

const createDevice = async (device: FormData): Promise<IDevice> => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

const fetchDevices = async ({
  typeId,
  brandId,
  page,
  limit = 5,
}: IFetchDevicesParams): Promise<IDevices> => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

const fetchOneDevice = async (id: number): Promise<IDevice> => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};

export {
  createDevice,
  fetchDevices,
  fetchOneDevice,
};
