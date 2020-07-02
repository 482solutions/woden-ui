import Woden from 'woden';
import download from 'downloadjs';
import { message } from 'antd';
import {
  CLEAN_STORAGE,
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
export const initialFilesystem = () => async(dispatch) => {
  dispatch({
    type: CLEAN_STORAGE,
  });
};
const updateFolderData = (folderData, mode) => (dispatch) => {
  let data = folderData.folder;
  console.log("FolderData:",folderData);
  if ('sharedFolders' in data && 'sharedFiles' in data && mode === 'share') {
    data = Object.assign(data, {
      folders: data.sharedFolders,
      files: data.sharedFiles,
    });
  }
  data = Object.assign(data, {folderInfo:folderData.folders, filesInfo: folderData.files})
  dispatch({
    type: SET_FOLDER_DATA,
    payload: data,
    mode,
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
export const getFolderData = (hash, mode = 'drive') => async(dispatch) => {
  message.loading('Getting data...', 0);
  Bearer.apiKey = await getTokenForHeader();
  api.getFolder(
    hash,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 203) {
        localStorage.removeItem('token');
        localStorage.removeItem('rootFolder');
        dispatch({
          type: LOGOUT,
        });
        dispatch({
          type: CLEAN_STORAGE,
        });
      } else {
        const folderData = response.body;
        dispatch(updateFolderData(folderData, mode));
      }
    },
  );
};
export const createFolder = (folder) => async(dispatch) => {
  message.loading('Creating folder...', 0);
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
        const folderData = response.body;
        dispatch(updateFolderData(folderData, 'drive'));
      }
    },
  );
};
export const uploadFile = (file) => async(dispatch) => {
  message.loading('Uploading file...', 0);
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
        const folderData = response.body;
        dispatch(updateFolderData(folderData, 'drive'));
      }
    },
  );
};
export const updateFile = (file) => async() => {
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
        message.success('File updated successfully');
      }
    },
  );
};
export const downloadFile = (name, cid, hash) => async(dispatch) => {
  message.loading('Downloading file...', 0);
  Bearer.apiKey = await getTokenForHeader();
  api.downloadFile(
    hash, cid,
    (error, data, response) => {
      message.destroy();
      if (error) {

        message.error(response.body);
      } else {
        message.success('File downloaded successfully');
        const name = name;
        const type = response.headers['content-type'];
        const file = response.text;
        download(file, name, type,);
        dispatch({
          type: DOWNLOAD_FILE,
        });
      }
    },
  );
};
export const getVersions = (hash) => async(dispatch) => {
  message.loading('Getting file versions...', 0);
  Bearer.apiKey = await getTokenForHeader();
  api.versions(
    hash,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        const versionList = response.body.versions;
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
