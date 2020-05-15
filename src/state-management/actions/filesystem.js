import Woden from 'woden';
import { message } from 'antd';
import { BACK, FORWARD, GET_FOLDER_DATA, SET_FOLDER_DATA } from '../types';
import { getTokenForHeader } from '../../utils/functions';

const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;
export const goBack = (dirname) => async(dispatch) => {
  dispatch({
    type: BACK,
    payload: dirname,
  });
};
export const goForward = (dirname) => async(dispatch) => {
  dispatch({
    type: FORWARD,
    payload: dirname,
  });
};
export const setFolderData = (folderData) => async(dispatch) => {
  dispatch({
    type: SET_FOLDER_DATA,
    payload: folderData,
  });
};
export const getFolderData = (folderHash) => async(dispatch) => {
  try {
    const { Bearer } = defaultClient.authentications;
    Bearer.apiKey = getTokenForHeader();
    // const body = new Woden.GetFolder();
    api.getFolder(
      body,
      (error, data, response) => {
        if (error) {
          console.log(response);
        } else if (response.status === 201) {
          dispatch({
            type: GET_FOLDER_DATA,
            payload: response,
          });
          console.log(response.body);
          message.success('Folder data was response');
        }
      },
    );
  } catch (e) {
    console.log(e, 3);
  }
};
