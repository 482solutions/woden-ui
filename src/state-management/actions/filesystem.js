import Woden from 'woden';
import download from 'downloadjs';
import { message } from 'antd';
import {
  BACK, FORWARD, SET_FOLDER_DATA, SEARCH_FOLDER_FILE, DOWNLOAD_FILE,
} from '../types';
import { getTokenForHeader } from '../../utils/functions';

const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;
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
export const search = (value) => async(dispatch) => {
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
export const getFolderData = (hash) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  api.getFolder(
    hash,
    (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else {
        const folderData = response.body.folder;
        folderData.folders = JSON.parse(folderData.folders);
        folderData.files = JSON.parse(folderData.files);
        dispatch({
          type: SET_FOLDER_DATA,
          payload: folderData,
        });
      }
    },
  );
};
export const createFolder = (folder) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  const body = new Woden.CreateFolder();
  body.name = folder.name;
  body.parentFolder = folder.parentFolder;
  api.createFolder(
    body,
    (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 201) {
        const folderData = response.body.folder;
        folderData.folders = JSON.parse(folderData.folders);
        folderData.files = JSON.parse(folderData.files);
        dispatch({
          type: SET_FOLDER_DATA,
          payload: folderData,
        });
      }
    },
  );
};
export const uploadFile = (file) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  const { name, parentFolder, file: fileData } = file;
  api.uploadFile(
    name, parentFolder, fileData,
    (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 200) {
        message.success('Folder created successful');
        const folderData = response.body.folder;
        folderData.folders = JSON.parse(folderData.folders);
        folderData.files = JSON.parse(folderData.files);
        dispatch({
          type: SET_FOLDER_DATA,
          payload: folderData,
        });
      }
    },
  );
};
export const downloadFile = (hash) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  api.downloadFile(
    hash,
    (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else {
        const { name, type, file } = response.body;
        download(file, name, type);
        dispatch({
          type: DOWNLOAD_FILE,
        });
      }
    },
  );
};
