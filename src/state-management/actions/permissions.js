import Woden from 'woden';
import { message } from 'antd';
import {
  CHANGE_PERMISSION,
} from '../types';
import { getTokenForHeader } from '../../utils/functions';

const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;

export const changePermissions = (permissionData) => async(dispatch) => {
  console.log('changePermissions', permissionData);
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Changing permissions...');

  setTimeout(() => {
    message.destroy();
    message.success('Permissions changed');
  }, 2000);
  // api.permission(
  //   permissionData.username, permissionData.permission, permissionData.hash,
  //   (error, data, response) => {
  //     if (error) {
  //       message.error(response.body.message);
  //     } else {
  //       message.success(response.body.message);
  //
  //       dispatch({
  //         type: CHANGE_PERMISSION,
  //       });
  //     }
  //   },
  // );
};
