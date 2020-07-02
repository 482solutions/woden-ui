import Woden from 'woden';
import { message } from 'antd';
import { CHANGE_PERMISSION, REVOKE_PERMISSIONS } from '../types';
import { getTokenForHeader } from '../../utils/functions';
import { updateFolderData } from './filesystem'

const api = new Woden.PermissionsApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;

export const changePermissions = (permissionData, folderData) => async (dispatch) => {
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
        dispatch({
          type: CHANGE_PERMISSION,
        });
        dispatch(updateFolderData(folderData, 'drive'));
      }
    });
};

export const revokePermissions = (permissionData) => async (dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Revoking access...', 0);

  const body = new Woden.RevokePermissions();
  console.log("Data:", permissionData);
  body.email = permissionData.username;
  body.hash = permissionData.hash;
  body.permission = permissionData.permissions;
  api.revokePermissions(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        message.success('Access revoked successfully');
        dispatch({
          type: REVOKE_PERMISSIONS,
        });
      }
    });
}
