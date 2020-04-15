import {SAVE_PERMISSIONS, EDIT_PERMISSIONS, SHOW_PERMISSIONS} from '../types';
import { models } from '../../utils';

const initialState = {
  isShow: '',
  info: {
    'root': {
      owner: 'dev',
      view: [],
      edit: []
    },
  }
};

const handleShow = (state, path = '') => ({
  ...state,
  isShow: path,
});

const handleSave = (state, { path, permissions }) => ({
  ...state,
  info: {
    ...state.info,
    [path]: permissions
  },
});

const handleEdit = (state, { path, permission }) => {
  let permissions = permission.user;
  if (permission.type !== models.Permissions.Owner) {
    let prevPermissions = [];
    if (state[permission.type]) {
      prevPermissions = [
        ...state[permission.type]
      ]
    }
    permissions = [
      ...prevPermissions,
      permission.user,
    ];
  }
  return {
    ...state,
    info: {
      ...state.info,
      [path]: {
        ...state.filename,
        [permission.type]: permissions
      }
    },
  };
};

const handlers = {
  [SAVE_PERMISSIONS]: handleSave,
  [EDIT_PERMISSIONS]: handleEdit,
  [SHOW_PERMISSIONS]: handleShow,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};