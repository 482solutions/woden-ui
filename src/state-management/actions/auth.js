import { message } from 'antd';
import Woden from 'woden';
// eslint-disable-next-line import/no-extraneous-dependencies
import download from 'downloadjs';
import { LOGIN, LOGOUT, REGISTRATION } from '../types';
import { encryptData } from '../../utils/functions';

const api = new Woden.UserApi();
const defaultClient = Woden.ApiClient.instance;

export const login = (username) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: username,
  });
};


// eslint-disable-next-line no-return-await,no-use-before-define
export const regRequest = (user) => async(dispatch) => await registration(user, dispatch);

const registration = async(user, dispatch) => {
  const password = (encryptData(user.password));
  const { email, name, csr } = user;
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
          message.success('Registration successful');
        }
      },
    );
  } catch (e) {
    message.error(e.message, 3);
  }
  dispatch({
    type: REGISTRATION,
  });
};


const logIn = async(user, dispatch) => {
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


export const loginRequest = (user) => async(dispatch) => {
  await logIn(user, dispatch);
};


export const logout = () => async(dispatch) => {
  const token = localStorage.getItem('token');
  const { oAuth2 } = defaultClient.authentications;
  oAuth2.accessToken = token;
  api.logout((error, data, response) => {
    if (error) {
      console.log('Error:', response);
    }
  });
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
};
