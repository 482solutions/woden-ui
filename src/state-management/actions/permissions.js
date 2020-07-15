import Woden from 'woden';
import { message } from 'antd';
import { getTokenForHeader } from '../../utils/functions';
import { UPDATE_PERMISSION } from '../types';

const api = new Woden.PermissionsApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;


export const changePermissions = (permissionData) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Changing permissions...', 0);
  const body = new Woden.ChangePermissions();
  body.email = permissionData.username;
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
        console.log('UP');
        dispatch({
          type: UPDATE_PERMISSION,
          payload: folderData,
        });
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
        console.log('DP');
        dispatch({
          type: UPDATE_PERMISSION,
          payload: folderData,
        });
      }
    });
};
