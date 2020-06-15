import {
  GET_FOLDER_DATA, SEARCH_FOLDER_FILE, SET_FOLDER_DATA, GET_VERSIONS,
} from '../types';

const initialState = {
  folderName: null,
  folderHash: null,
  parentHash: null,
  entryFolders: [],
  entryFiles: [],
  versions: {
    file: null,
    versionList: [],
  },
};

const handleSetFolder = (state, folderData) => ({
  ...state,
  folderName: folderData.name,
  folderHash: folderData.hash,
  parentHash: folderData.parenthash,
  entryFolders: folderData.folders,
  entryFiles: folderData.files,
});
const handleGetFolder = (state, folderData) => ({
  ...state,
  folderName: folderData.name,
  folderHash: folderData.hash,
  parentHash: folderData.parenthash,
  entryFolders: folderData.folders,
  entryFiles: folderData.files,
});
const handleSearch = (state, resultData) => ({
  ...state,
  folderName: resultData.name,
  folderHash: resultData.hash,
  parentHash: null,
  entryFolders: resultData.folders,
  entryFiles: resultData.files,
});
const handleVersions = (state, fileData) => ({
  ...state,
  versions: {
    file: fileData.hash,
    versionList: fileData.versionList,
  },
});
const handlers = {
  [SET_FOLDER_DATA]: handleSetFolder,
  [GET_FOLDER_DATA]: handleGetFolder,
  [SEARCH_FOLDER_FILE]: handleSearch,
  [GET_VERSIONS]: handleVersions,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
