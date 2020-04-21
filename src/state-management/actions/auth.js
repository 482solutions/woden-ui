import { message } from 'antd';
import Woden from 'woden';
import { LOGIN, LOGOUT } from "../types";
import { functions } from "../../utils";
import { savePermission } from "./permissions";

const api = new Woden.UserApi();

export const login = (username) => dispatch => {
  dispatch(savePermission(
    username,
    {
      owner: username,
      view: [],
      edit: []
    },
  ));

  dispatch({
    type: LOGIN,
    payload: username,
  });
};


export const regRequest = (user) => async dispatch => {
  return await registration(user, dispatch);
}

const registration = async (user) => {
  const { password, email, name } = user;
  const { data } = await api.createUser(name, email, password, "/path/to/file.txt");

  if (data.error && data.error !== "User already exists") {
    message.error(data.error);
    console.log(data);
    return;
  } else if (data.error === "User already exists") {
    return true;
  }
}


const logIn = async (user, dispatch) => {
  const { data: { token, error } } = await api.login(user.name,
    user.password,
    "certificate_file",
    "private_key");
  if (error) {
    message.error(error);
    return;
  }
  functions.setAuthorizationToken(token);
  localStorage.setItem('token', token);
  dispatch(login(user.name));
}


export const loginRequest = (user) => async dispatch => {
  await logIn(user, dispatch);

};


export const logout = () => async dispatch => {
  await api.logout();
  localStorage.removeItem('token');
  functions.setAuthorizationToken();

  dispatch({
    type: LOGOUT,
  });
};
