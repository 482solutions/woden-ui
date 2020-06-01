import Woden from 'woden';
import download from 'downloadjs';
import { message } from 'antd';
import {
  BACK, FORWARD, SET_FOLDER_DATA, SEARCH_FOLDER_FILE, DOWNLOAD_FILE, GET_VERSIONS, LOGOUT,
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
      } else
      if (response.status === 203) {
        localStorage.removeItem('token');
        localStorage.removeItem('rootFolder');
        dispatch({
          type: LOGOUT,
        });
      } else {
        const folderData = response.body.folder;
        folderData.folders = JSON.parse(folderData.folders);
        folderData.files = JSON.parse(folderData.files);
        // TODO: Убрать следующую конструкцию после добавления cid на стороне backend
        for (let i = 0; i < folderData.files.length; i += 1) {
          folderData.files[i].cid = folderData.files[i].hash;
        }
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
  Bearer.apiKey = await getTokenForHeader();
  const { fileHash, file: fileData } = file;
  api.updateFile(
    fileHash, fileData,
    (error, data, response) => {
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
export const downloadFile = (cid) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  api.downloadFile(
    cid,
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
export const getVersions = (hash) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  const fakeResult = [
    {
      CID: 'QmRxjZDSaMdKTuGDrXYGVdzK2HHpH36K2pBoEoDunTxoTY',
      Time: 1590657618000,
    },
    {
      CID: 'QmeUcNsfqve3d9QVNieqHjbEWk6CqtqwAixkg3ecFVKtH5',
      Time: 1590657000000,
    },
  ];
  api.versions(
    hash,
    (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else {
        // TODO: Раскомментировать до реализации получения версий на стороне backend
        // const versionList = response.body.versions;
        // const versions = {
        //   hash,
        //   versionList,
        // };
        // TODO: Удалить после реализации получения списка версий на стороне backend
        const versions = {
          hash,
          versionList: fakeResult,
        };
        dispatch({
          type: GET_VERSIONS,
          payload: versions,
        });
      }
    },
  );
};
