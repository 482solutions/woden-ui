import Woden from 'woden';
import { message } from 'antd';
import { CHANGE_PERMISSION } from '../types';
import { getTokenForHeader } from '../../utils/functions';

const api = new Woden.PermissionsApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;

export const changePermissions = (permissionData) => async(dispatch) => {
  console.log('changePermissions', permissionData);
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
        message.success(response.body.message);
        dispatch({
          type: CHANGE_PERMISSION,
        });
      }
    });
};
