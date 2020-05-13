import { BACK, CREATE_DIRECTORY, FORWARD, GET_DIRECTORY_DATA } from '../types';

const initialState = {
  directory: 'root',
  entryFolders: [],
  entryFiles: []
};

const handleBack = (state, dirname) => ({
  //TODO: Реализация для обработки возврата в предыдущую директорию
});
const handleForward = (state, dirname) => ({
  //TODO: Реализация для обработки перехода в следующую директорию
});
const handleCreateDirectory = (state, dirname) => ({
  //TODO: Реализация для создания новой директории
});
const handleGetDirectory = (dirData) => ({
  mess: dirData,
});
const handlers = {
  [BACK]: handleBack,
  [FORWARD]: handleForward,
  [CREATE_DIRECTORY]: handleCreateDirectory,
  [GET_DIRECTORY_DATA]: handleGetDirectory,
};

export default (state = initialState, action) => {
  console.log(action);
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
