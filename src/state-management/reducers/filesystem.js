import {
  GET_FOLDER_DATA,
  GET_VERSIONS,
  SEARCH_FOLDER_FILE,
  SET_FOLDER_DATA,
  CLEAN_STORAGE,
  GET_FOLDERS_TREE,
  UPDATE_FOLDER_DATA,
} from '../types';

const initialState = {
  drive: {
    folderName: null,
    folderHash: null,
    parentHash: null,
    entryFolders: [],
    entryFiles: [],
    foldersInfo: [],
    filesInfo: [],
  },
  share: {
    folderName: null,
    folderHash: null,
    parentHash: null,
    entryFolders: [],
    entryFiles: [],
    foldersInfo: [],
    filesInfo: [],
  },
  versions: {
    file: null,
    versionList: [],
  },
  tree: [],
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
    foldersInfo: folderData.folderInfo,
    filesInfo: folderData.filesInfo,
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

const handleUpdateFolder = (state, fileData, mode) => {
  const dataIndex = state[mode].filesInfo.findIndex((element, index) => {
    if (element.fileHash === fileData.fileHash) {
      return index;
    }
    return false;
  });
  const newData = state[mode].filesInfo;
  newData[dataIndex] = fileData;
  return {
    ...state,
    [mode]: { ...state[mode], filesInfo: newData },
  };
};

const handleSearch = (state, folderData, mode) => ({
  ...state,
  [mode]: {
    folderName: folderData.folderName,
    folderHash: folderData.folderHash,
    entryFolders: folderData.folders,
    entryFiles: folderData.files,
    parentHash: null,
  },
});

const handleVersions = (state, fileData) => ({
  ...state,
  versions: {
    file: fileData.hash,
    versionList: fileData.versionList,
  },
});

const handleTree = (state, treeData) => ({
  ...state,
  tree: treeData,
});

const handlers = {
  [SET_FOLDER_DATA]: handleSetFolder,
  [GET_FOLDER_DATA]: handleGetFolder,
  [UPDATE_FOLDER_DATA]: handleUpdateFolder,
  [SEARCH_FOLDER_FILE]: handleSearch,
  [GET_VERSIONS]: handleVersions,
  [CLEAN_STORAGE]: cleanStorage,
  [GET_FOLDERS_TREE]: handleTree,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload, action.mode) : state;
};
