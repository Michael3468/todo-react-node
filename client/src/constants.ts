const ROUTE = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  MAIN: '/',
};

const USER_ROLE = {
  USER: 'USER',
} as const;

const mainTheme = {
  header: {
    height: 54,
  },

  link: {
    color: 'white',
  },

  navbarIcon: {
    size: 36,
  },
};

export { ROUTE, USER_ROLE, mainTheme };
