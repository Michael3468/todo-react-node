import { getAllUsers } from '../api';

const getUsers = async () => {
  let users;
  try {
    users = await getAllUsers();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return users;
};

export default getUsers;
