import Woden from 'woden';
import download from 'downloadjs';
import axios from 'axios'
import { message } from 'antd';
import {
  CLEAN_STORAGE,
  DOWNLOAD_FILE,
  GET_FOLDERS_TREE,
  GET_VERSIONS,
  LOGOUT,
  SEARCH_FOLDER_FILE,
  SET_FOLDER_DATA,
  UPDATE_PERMISSION,
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

export const updateFolderData = (folderData, mode) => (dispatch) => {
  let data = folderData.folder;
  if ('sharedFolders' in data && 'sharedFiles' in data && mode === 'share') {
    data = Object.assign(data, {
      folders: data.sharedFolders,
      files: data.sharedFiles,
    });
  }

  data = Object.assign(data, { folderInfo: folderData.folders, filesInfo: folderData.files });

  const { writeUsers } = data;
  const { readUsers } = data;
  const access = {
    readUsers,
    writeUsers,
  };
  dispatch({
    type: SET_FOLDER_DATA,
    payload: data,
    mode,
  });
  dispatch({
    type: UPDATE_PERMISSION,
    payload: access,
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

export const downloadFile = (hash, cid, name) => async(dispatch) => {
  message.loading('Downloading file...', 0);
  const token = await getTokenForHeader();
  axios.get(`http://localhost:1823/api/v1/file/${hash}/${cid}`,
    {
      headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
      responseType: 'blob',
    }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    message.destroy();
  });
  dispatch({
    type: DOWNLOAD_FILE,
  });
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

// const replaceValues = (name, hash, folders) => {
//   const key = hash;
//   const title = name;
//   const tree = [{
//     title,
//     key,
//     children: [],
//   }];
//   for (let i = 0; i < folders.length; i++) {
//     const child = replaceValues(folders[i].name, folders[i].hash, folders[i].folders);
//     tree[0].children.push(child);
//   }
//   return tree;
// };

export const getFoldersTree = () => async(dispatch) => {
  message.loading('Getting folders tree...', 0);
  Bearer.apiKey = await getTokenForHeader();
  api.tree(
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        const oldData = JSON.stringify(response.body.response);
        const tree = [];
        tree[0] = JSON.parse(oldData.replace(/hash/g, 'key').replace(/name/g, 'title').replace(
          /folders/g,
          'children',
        ));
        dispatch({
          type: GET_FOLDERS_TREE,
          payload: tree,
        });
      }
    },
  );
};
