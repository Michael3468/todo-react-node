interface IUser {
  id: number;
  login: string;
  password: string;
  name: string;
  lastName: string;
  patronymic: string;
  supervisor: string;
}

// eslint-disable-next-line import/prefer-default-export
export type { IUser };
