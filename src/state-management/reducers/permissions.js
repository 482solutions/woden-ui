import { UPDATE_PERMISSION } from '../types';

const initialState = {
  readUsers: [],
  writeUsers: [],
};

const handlePermission = (state, folderData) => ({
  ...state,
  readUsers: folderData.readUsers,
  writeUsers: folderData.writeUsers,
});

const handlers = {
  [UPDATE_PERMISSION]: handlePermission,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
