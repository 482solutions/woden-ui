import Woden from 'woden';
import { BACK, CREATE_DIRECTORY, FORWARD, } from "../types";

const api = new Woden.UserApi();
const defaultClient = Woden.ApiClient.instance;
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
export const createDirectory = (dirname) => async (dispatch, getState) => {
  //TODO: Запрос на создание новой директории на сервер
  dispatch({
    type: CREATE_DIRECTORY,
    payload: dirname
  });
};
