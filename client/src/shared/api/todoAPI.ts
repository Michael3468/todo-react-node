import { AxiosResponse } from 'axios';

import { ITodo } from '../types';
import { $host, $authHost } from './AxiosInstanses';

const createTODO = async (todo: FormData): Promise<ITodo> => {
  const { data } = await $authHost.post('api/todo', todo);
  return data;
};

const editTODO = async (todo: FormData): Promise<ITodo[]> => {
  const { data } = await $authHost.patch('api/todo', todo);
  return data;
};

const getAllTODOS = async (): Promise<ITodo[]> => {
  const response: AxiosResponse<ITodo[]> = await $host.get('api/todo');
  const { data } = response;
  return data;
};

export { createTODO, editTODO, getAllTODOS };
