// import { message } from 'antd';
import {
  BACK,
  FORWARD,
  SAVE_TREE,
  CREATE_DIRECTORY,
  SAVE_PERMISSIONS,
  UPLOAD_FILE,
  SELECT_ITEM,
  UNSELECT_ITEM,
  CLEAN_STORAGE
} from "../types";
import { savePermission } from './permissions';
import { api, functions } from "../../utils";

export const goBack = (dirname) => async dispatch => {
  dispatch({
    type: BACK,
    payload: dirname
  });
};

export const goForward = (dirname) => async dispatch => {
  dispatch({
    type: FORWARD,
    payload: dirname
  });
};

export const getFullTree = () => async dispatch => {
  const { data: response } = await api.getTree();
  console.log(response);
  if (response.error) {
    // message.error(response.error);
    console.log(response);
    return;
  }

  const {data: shared} = await api.getSharedTree();
  if (shared.error) {
    console.log(shared.error);
    return;
  } 

  if (shared.entries.length) {
    response.entries.push(shared);
  } 

  dispatch({
    type: SAVE_TREE,
    payload: response,
  });
};

export const createDirectory = (dirname) => async (dispatch, getState) => {
  const { filesystem, permissions } = getState();
  const path = `${filesystem.directory}/${dirname}`;

  const { data: response } = await api.createDirectory(path.split('/').slice(1).join('/'));
  if (response.error) {
    // message.error(response.error);
    console.log(response);
    return;
  }

  dispatch({
    type: CREATE_DIRECTORY,
    payload: dirname
  });

  dispatch(savePermission(
    path,
    permissions.info[path.split('/').slice(-1).join('/')],
  ));
};

export const uploadFile = (file) => async (dispatch, getState) => {
  const { filesystem, permissions } = getState();
  const pathList = filesystem.directory.split('/').slice(1);

  let data;
  if (pathList[0] === 'shared') {
    data = await api.uploadSharedFile(
      pathList.slice(1).join('/'),
      file,
    )
  } else {
    data = await api.uploadFile(
      pathList.join('/'),
      file,
    );
  }
  if (data.error) {
    // message.error(data.error);
    console.log(data);
    return;
  }

  dispatch({
    type: UPLOAD_FILE,
    payload: file.name
  });

  dispatch(savePermission(
    `${filesystem.directory}/${file.name}`,
    permissions.info[filesystem.directory],
  ));
};

export const setSelected = ({ type, name }) => ({
  type: SELECT_ITEM,
  payload: {
    type,
    name
  }
});

export const setUnselected = () => ({
  type: UNSELECT_ITEM
});

export const cleanStorage = () => ({
  type: CLEAN_STORAGE
});