import {
  BACK,
  FORWARD,
  SAVE_TREE,
  CREATE_DIRECTORY,
  UPLOAD_FILE,
  SELECT_ITEM,
  UNSELECT_ITEM,
  CLEAN_STORAGE
} from '../types';
import { functions } from '../../utils';

const initialState = {
  directory: 'root',
  entries: [],
  selected: {
    type: undefined,
    name: ""
  }
};

const handleBack = (state, dirname) => ({
  ...state,
  directory: state.directory.split('/').slice(0, state.directory.split('/').indexOf(dirname) + 1).join('/'),
});

const handleForward = (state, dirname) => ({
  ...state,
  directory: `${state.directory}/${dirname}`,
});

const handleSaveTree = (state, tree) => ({
  ...state,
  ...tree
});

const handleCreateDirectory = (state, dirname) => {
  const newState = functions.saveToCurrentDirectory(
    { ...state },
    state.directory,
    {
      directory: dirname,
      entries: []
    },
  );

  return {
    ...newState
  }
};

const handleUploadFile = (state, filename) => {
  const newState = functions.saveToCurrentDirectory(
    state,
    state.directory,
    filename,
  );

  return {
    ...newState
  }
};

const handleSetSelected = (state, { type, name }) => {
  return {
    ...state,
    selected: {
      type,
      name
    }
  }
};

const handleSetUnselected = (state) => {
  return {
    ...state,
    selected: {
      type: undefined,
      name: ""
    }
  }
};

const cleanStorage = (state) => {
  return initialState;
}

const handlers = {
  [BACK]: handleBack,
  [FORWARD]: handleForward,
  [SAVE_TREE]: handleSaveTree,
  [CREATE_DIRECTORY]: handleCreateDirectory,
  [UPLOAD_FILE]: handleUploadFile,
  [SELECT_ITEM]: handleSetSelected,
  [UNSELECT_ITEM]: handleSetUnselected,
  [CLEAN_STORAGE]: cleanStorage
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};