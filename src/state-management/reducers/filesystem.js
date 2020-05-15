import {
  BACK, SET_FOLDER_DATA, FORWARD, GET_FOLDER_DATA,
} from '../types';

const initialState = {
  folderName: null,
  folderHash: null,
  parentHash: null,
  entryFolders: [2],
  entryFiles: [],
};

const handleBack = (state, dirname) => ({
  // TODO: Реализация для обработки возврата в предыдущую директорию
});
const handleForward = (state, dirname) => ({
  // TODO: Реализация для обработки перехода в следующую директорию
});
const handleSetFolder = (state, folderData) => (
  {
    ...state,
    folderName: folderData.name,
    folderHash: folderData.hash,
    parentHash: folderData.parentHash,
    entryFolders: folderData.folders,
    entryFiles: folderData.files,
  }
);
const handleGetFolder = (state, folderData) => ({
  folderName: folderData.name,
  folderHash: folderData.hash,
  parentHash: folderData.parentHash,
  entryFolders: folderData.folders,
  entryFiles: folderData.files,
});
const handlers = {
  [BACK]: handleBack,
  [FORWARD]: handleForward,
  [SET_FOLDER_DATA]: handleSetFolder,
  [GET_FOLDER_DATA]: handleGetFolder,
};

export default (state = initialState, action) => {
  console.log(action);
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
