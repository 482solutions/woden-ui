import { message } from 'antd';
import Woden from 'woden';
import { LOGIN, LOGOUT } from "../types";
import { functions } from "../../utils";
import { savePermission } from "./permissions";
import axios from 'axios';

const { encryptData } = functions;

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
  const password = (encryptData(user.password));
  const { email, name } = user;
  const { data } = await api.createUser(name, email, password, "/path/to/file.txt");

  if (data.error && data.error !== "User already exists") {
    message.error(data.error);
  } else if (data.error === "User already exists") {
    return true;
  }
}


const logIn = async (user, dispatch) => {
  const password = (encryptData(user.password));
  api.login(
    user.name,
    password,
    user.certificate,
    user.privateKey, (error, data, response) => {
      if (error) {
        message.error(JSON.parse(response.text).error);
        return;
      }
      if (response.status === 200) {
        const token = response.text.replace(/["]/g, '').trim();
        functions.setAuthorizationToken(token);
        localStorage.setItem('token', token);
        dispatch(login(user.name));
      }
    });
}


export const loginRequest = (user) => async dispatch => {
  await logIn(user, dispatch);

};


export const logout = () => async dispatch => {
  console.log(axios.defaults)
  api.logout((error, data, response)=>{
    if(error){
      console.log('Error:', response);
    }
    else{
      localStorage.removeItem('token');
      functions.setAuthorizationToken();

      dispatch({
        type: LOGOUT,
      });
    }
  });

};
