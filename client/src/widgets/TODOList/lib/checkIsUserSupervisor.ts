import { getAllUsers } from '../../../shared/api';

const checkIsUserSupervisor = async (login: string): Promise<boolean> => {
  try {
    const users = await getAllUsers();
    const usersWithSupervisor = users.filter((user) => user.supervisor === login);
    return usersWithSupervisor && usersWithSupervisor?.length > 0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

export default checkIsUserSupervisor;
