import {
  GET_FOLDER_DATA, GET_VERSIONS, SEARCH_FOLDER_FILE, SET_FOLDER_DATA, SET_SHARE_DATA,
} from '../types';

const initialState = {
  folderName: null,
  folderHash: null,
  parentHash: null,
  entryFolders: [],
  entryFiles: [],
  shareFolders: [],
  shareFiles: [],
  versions: {
    file: null,
    versionList: [],
  },
};

const handleSetFolder = (state, folderData) => ({
  ...state,
  folderName: folderData.folderName,
  folderHash: folderData.folderHash,
  parentHash: folderData.parentFolderHash,
  entryFolders: folderData.folders,
  entryFiles: folderData.files,
});
const handleSetShareData = (state, shareData) => ({
  ...state,
  ...shareData,
});
const handleGetFolder = (state, folderData) => ({
  ...state,
  folderName: folderData.folderName,
  folderHash: folderData.folderHash,
  parentHash: folderData.parentFolderHash,
  entryFolders: folderData.folders,
  entryFiles: folderData.files,
});
const handleSearch = (state, resultData) => ({
  ...state,
  folderName: resultData.folderName,
  folderHash: resultData.folderHash,
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
  [SET_SHARE_DATA]: handleSetShareData,
  [GET_FOLDER_DATA]: handleGetFolder,
  [SEARCH_FOLDER_FILE]: handleSearch,
  [GET_VERSIONS]: handleVersions,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
