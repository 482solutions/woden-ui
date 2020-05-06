import { message } from 'antd';
import Woden from 'woden';
import download from 'downloadjs';
import { LOGIN, LOGOUT, REGISTRATION } from '../types';
import { encryptData } from '../../utils/functions';

const api = new Woden.UserApi();
const defaultClient = Woden.ApiClient.instance;

export const login = (userId) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: userId,
  });
};

export const regRequest = (user) => async (dispatch) => await registration(user, dispatch);

const registration = async (user, dispatch) => {
  const password = (encryptData(user.password));
  const { email, name, csr } = user;
  console.log(csr);
  try {
    api.createUser(
      name,
      email,
      password,
      csr.csrPem, (error, data, response) => {
        if (error) {
          message.error(JSON.parse(response.text).error);
        } else if (response.status === 201) {
          if (JSON.parse(response.text).cert) {
            download(csr.privateKeyPem, `${csr.privateHex}_sk.pem`, 'text/plain');
            download(JSON.parse(response.text).cert, 'cert.pem', 'text/plain');
          }
          message.success('Registration was successful');
        }
      },
    );
  }
  catch (e) {
    message.error(e.message, 3);
  }
  dispatch({
    type: REGISTRATION,
  });
};

export const loginRequest = (user) => async (dispatch) => {
  await logIn(user, dispatch);
};

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
        localStorage.setItem('token', token);
        dispatch(login(user.name));
      }
    },
  );
};

export const changePasswordRequest = (data) => async (dispatch) => {
  await changePassword(data, dispatch);
};

export const changePassword = (data, dispatch) => {
  const { currentPassword, newPassword } = data;
  const token = localStorage.getItem('token');
  const { oAuth2 } = defaultClient.authentications;
  oAuth2.accessToken = token;

  const body = new Woden.Body();
  body.oldPassword = currentPassword;
  body.newPassword = newPassword;
  api.changeUser(body, (error, data, response) => {
    if (error) {
      console.log("Error", response);
    } else {
      console.log("Response", response);
    }
  });
}
export const logout = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const { oAuth2 } = defaultClient.authentications;
  oAuth2.accessToken = token;
  const body = new Woden.Body();
  api.logout(body, (error, data, response) => {
    if (error) {
      console.log('Error:', response);
    }
  });
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
};
