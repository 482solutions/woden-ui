import { BACK, FORWARD, SET_FOLDER_DATA } from '../types';

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
export const setFolderData = (folderData) => async(dispatch) => {
  dispatch({
    type: SET_FOLDER_DATA,
    payload: folderData,
  });
};
