import { UPDATE_PERMISSION } from '../types';

const initialState = {
  readUsers: [],
  writeUsers: [],
};

const handleUpdatePermission = (state, info) => ({
  ...state,
  readUsers: info.readUsers,
  writeUsers: info.writeUsers,
});

const handlers = {
  [UPDATE_PERMISSION]: handleUpdatePermission,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
