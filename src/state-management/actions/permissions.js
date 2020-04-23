// import { message } from "antd";
import { SAVE_PERMISSIONS, EDIT_PERMISSIONS, SHOW_PERMISSIONS } from "../types";
import { api } from "../../utils";

export const savePermission = (path, permissions) => async dispatch => {
  dispatch({
    type: SAVE_PERMISSIONS,
    payload: { path, permissions }
  });
};

export const editPermission = (path, permission) => async dispatch => {
  const { data: response } = await api.setPermissions(path, permission);
  if (response.error) {
    // message.error(response.error);
    console.log(response);
    return;
  }

  dispatch({
    type: EDIT_PERMISSIONS,
    payload: { path, permission }
  });
};

export const loadPermissions = (path = '') => async (dispatch, getState) => {
  const { permissions } = getState();
  console.log(path);
  if (!permissions.info[path]) {
    const { data: response } = await api.getPermissions(path.split('/').slice(1).join('/'));
    if (response.error && !response.error.startsWith("while getting permissions: failed to get permissions: abi:")) {
      // message.error(response.error);
      console.log(response);
      return;
    } else if (response.error && response.error.startsWith("while getting permissions: failed to get permissions: abi:")) {
      return;
    }

    dispatch(savePermission(path, response));
  }
};

export const showPermissions = (path = '') => async dispatch => {
  dispatch(loadPermissions(path));

  dispatch({
    type: SHOW_PERMISSIONS,
    payload: path
  });
};
