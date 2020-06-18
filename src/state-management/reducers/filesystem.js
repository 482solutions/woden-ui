import {
  GET_FOLDER_DATA, GET_VERSIONS, SEARCH_FOLDER_FILE, SET_FOLDER_DATA, CLEAN_STORAGE,
} from '../types';

const initialState = {
  drive: {
    folderName: null,
    folderHash: null,
    parentHash: null,
    entryFolders: [],
    entryFiles: [],
  },
  share: {
    folderName: null,
    folderHash: null,
    parentHash: null,
    entryFolders: [],
    entryFiles: [],
  },
  versions: {
    file: null,
    versionList: [],
  },
};
const cleanStorage = () => initialState;
const handleSetFolder = (state, folderData, mode) => ({
  ...state,
  [mode]: {
    folderName: folderData.folderName,
    folderHash: folderData.folderHash,
    parentHash: folderData.parentFolderHash,
    entryFolders: folderData.folders,
    entryFiles: folderData.files,
  },
});
const handleGetFolder = (state, folderData, mode) => ({
  ...state,
  [mode]: {
    folderName: folderData.folderName,
    folderHash: folderData.folderHash,
    parentHash: folderData.parentFolderHash,
    entryFolders: folderData.folders,
    entryFiles: folderData.files,
  },
});
const handleSearch = (state, folderData, mode) => ({
  ...state,
  [mode]: {
    folderName: folderData.folderName,
    folderHash: folderData.folderHash,
    parentHash: null,
    entryFolders: folderData.folders,
    entryFiles: folderData.files,
  },
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
  [CLEAN_STORAGE]: cleanStorage,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload, action.mode) : state;
};
