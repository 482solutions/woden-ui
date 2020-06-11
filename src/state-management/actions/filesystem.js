import Woden from 'woden';
import download from 'downloadjs';
import { message } from 'antd';
import {
  DOWNLOAD_FILE,
  GET_VERSIONS,
  LOGOUT,
  SEARCH_FOLDER_FILE,
  SET_FOLDER_DATA,
} from '../types';
import { getTokenForHeader } from '../../utils/functions';

const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;
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
      } else if (response.status === 203) {
        localStorage.removeItem('token');
        localStorage.removeItem('rootFolder');
        dispatch({
          type: LOGOUT,
        });
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
  message.loading('Creating folder...');
  Bearer.apiKey = await getTokenForHeader();
  const body = new Woden.CreateFolder();
  body.name = folder.name;
  body.parentFolder = folder.parentFolder;
  api.createFolder(
    body,
    (error, data, response) => {
      message.destroy();
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
  message.loading('Uploading file...');
  Bearer.apiKey = await getTokenForHeader();
  const { name, parentFolder, file: fileData } = file;
  api.uploadFile(
    name, parentFolder, fileData,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 200) {
        message.success('File created successful');
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
export const updateFile = (file) => async(dispatch) => {
  message.loading('Updating file...', 0);
  Bearer.apiKey = await getTokenForHeader();
  const { fileHash, file: fileData } = file;
  api.updateFile(
    fileHash, fileData,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 200) {
        message.success('File updated successful');
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
export const downloadFile = (cid, hash) => async(dispatch) => {
  message.loading('Downloading file...');
  Bearer.apiKey = await getTokenForHeader();
  api.downloadFile(
    hash, cid,
    (error, data, response) => {
      message.success('File downloaded successfully');
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
export const getVersions = (hash) => async(dispatch) => {
  message.loading('Getting file versions...');
  Bearer.apiKey = await getTokenForHeader();
  api.versions(
    hash,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        const versionList = JSON.parse(response.body.message);
        // const versionList = JSON.parse(response.body.versions);
        const versions = {
          hash,
          versionList,
        };
        dispatch({
          type: GET_VERSIONS,
          payload: versions,
        });
      }
    },
  );
};
