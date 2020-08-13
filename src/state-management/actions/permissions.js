import Woden from 'woden';
import { message } from 'antd';
import { getTokenForHeader } from '../../utils/functions';
import { UPDATE_PERMISSION, UPDATE_FOLDER_DATA } from '../types';

const api = new Woden.PermissionsApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;

export const updatePermission = (info) => async(dispatch) => {
  const { writeUsers, readUsers } = info;
  dispatch({
    type: UPDATE_PERMISSION,
    payload: {
      readUsers,
      writeUsers,
    },
  });
};

export const changePermissions = (permissionData) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Changing permissions...', 0);
  const body = new Woden.ChangePermissions();
  body.email = permissionData.email;
  body.hash = permissionData.hash;
  body.permission = permissionData.permissions;
  api.changePermissions(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        message.success('Permissions updated successfully');
        const folderData = response.body.response;
        dispatch(updatePermission(folderData));
        dispatch({ type: UPDATE_FOLDER_DATA, payload: folderData, mode: 'drive' });
      }
    });
};

export const revokePermissions = (permissionData) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Revoking access...', 0);
  const body = new Woden.RevokePermissions();
  body.email = permissionData.user;
  body.hash = permissionData.hash;
  body.permission = permissionData.permission;
  api.revokePermissions(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        message.success('Access revoked successfully');
        const folderData = response.body.response;
        dispatch(updatePermission(folderData));
      }
    });
};
