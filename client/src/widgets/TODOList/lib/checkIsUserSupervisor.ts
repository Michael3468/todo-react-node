import { getUsers } from '../../../shared/lib';

const checkIsUserSupervisor = async (login: string): Promise<boolean | undefined> =>
  getUsers()
    .then((users) => {
      const usersWithSupervisor = users?.filter((user) => user.supervisor === login);

      return usersWithSupervisor && usersWithSupervisor?.length > 0;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return false;
    });

export default checkIsUserSupervisor;
