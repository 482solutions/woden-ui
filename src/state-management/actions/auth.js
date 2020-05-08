import { message } from 'antd';
import Woden from 'woden';
import download from 'downloadjs';
import { LOGIN, LOGOUT, REGISTRATION } from '../types';
import { encryptData } from '../../utils/functions';

const api = new Woden.UserApi();
const defaultClient = Woden.ApiClient.instance;

export const login = (userName) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: userName,
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
      }
    );
    console.log("CSR:", csr.csrPem)
    console.log("PrivateKey:", csr.privateKeyPem)
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
  console.log("Login | userData", user);
  api.login(
    user.name,
    password,
    user.certificate,
    user.privateKey, (error, data, response) => {
      console.log(response);
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 200 && response.body.token) {
        const token = response.body.token;
        localStorage.setItem('token', token);
        dispatch(login(user.name));
      } else {
        message.warn(response.body.message);
      }
    },
  );
};

export const changePasswordRequest = (data) => async (dispatch) => {
  await changePassword(data, dispatch);
};

export const changePassword = (data, dispatch) => {
  const oldPassword = encryptData(data.oldPassword);
  const newPassword = encryptData(data.newPassword);
  const token = localStorage.getItem('token');
  const { oAuth2 } = defaultClient.authentications;
  oAuth2.accessToken = token;

  const body = new Woden.Body();
  body.oldPassword = oldPassword;
  body.newPassword = newPassword;
  api.changeUser(body, (error, data, response) => {
    if (error) {
      message.error(response.body.message);
    } else {
      message.success(response.body.message);
    }
  });
}
export const logout = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const { oAuth2 } = defaultClient.authentications;
  oAuth2.accessToken = token;
  api.logout((error, data, response) => {
    if (error) {
      console.warn(error);
      message.warn(response.message);
    } else if (response.status === 200 || response.status === 203) {
      message.success(response.body.message);
      localStorage.removeItem('token');
      dispatch({
        type: LOGOUT,
      });
    } else {
      message.warn(response.body.message);
    }
  });

};
