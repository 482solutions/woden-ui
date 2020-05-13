import Woden from 'woden';
import { message } from 'antd';
import {
  BACK, CREATE_DIRECTORY, FORWARD, GET_DIRECTORY_DATA,
} from '../types';

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
export const createDirectory = (dirData) => async(dispatch) => {
  const { name, parentFolder } = dirData;
  try {
    const token = localStorage.getItem('token');
    const { oAuth2 } = defaultClient.authentications;
    oAuth2.accessToken = token;
    const body = new Woden.Body2();
    body.name = name;
    body.parentFolder = parentFolder;
    api.createFolder(
      body,
      (error, data, response) => {
        if (error) {
          message.error(JSON.parse(response.text).error);
        } else if (response.status === 201) {
          message.success('Folder created successful');
        }
      },
    );
  } catch (e) {
    message.error(e.message, 3);
  }
  dispatch({
    type: CREATE_DIRECTORY,
    payload: name,
  });
};
export const getFolderData = (folderHash) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/v1/folder',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hash: folderHash }),

    };
    request(options, (error, response) => {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    api.getFolder(
      body,
      (error, data, response) => {
        if (error) {
          console.log(response);
        } else if (response.status === 201) {
          dispatch({
            type: GET_DIRECTORY_DATA,
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
