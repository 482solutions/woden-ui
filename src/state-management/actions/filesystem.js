import Woden from 'woden';
import { message } from 'antd';
import {
  BACK, FORWARD, SET_FOLDER_DATA, SEARCH_FOLDER_FILE,
} from '../types';
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
export const search = (value) => async(dispatch) => {
  const { Bearer } = defaultClient.authentications;
  Bearer.apiKey = await getTokenForHeader();
  api.search(value, (error, data, response) => {
    if (response.status === 200) {
      dispatch({
        type: SEARCH_FOLDER_FILE,
        payload: response.body,
      });
    } else {
      message.error(response.body.message);
    }
  });
};
