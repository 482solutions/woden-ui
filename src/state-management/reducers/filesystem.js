import { BACK, CREATE_DIRECTORY, FORWARD, } from '../types';

const initialState = {
  directory: 'root',
  entries: [],
  selected: {
    type: undefined,
    name: ""
  }
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
const handlers = {
  [BACK]: handleBack,
  [FORWARD]: handleForward,
  [CREATE_DIRECTORY]: handleCreateDirectory,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
