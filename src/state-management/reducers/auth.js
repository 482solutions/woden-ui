import { LOGIN, LOGOUT } from '../types';

const initialState = {
  isLoggedIn: false,
  user: {},
};

const handleLogin = (userName) => ({
  isLoggedIn: true,
  user: {
    name: userName,
  },
});

const handleLogout = () => initialState;

const handlers = {
  [LOGIN]: handleLogin,
  [LOGOUT]: handleLogout,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(action.payload) : state;
};
