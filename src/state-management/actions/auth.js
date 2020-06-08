import { message } from 'antd';
import Woden from 'woden';
import download from 'downloadjs';
import { LOGIN, LOGOUT, REGISTRATION } from '../types';
import { encryptData, getTokenForHeader } from '../../utils/functions';

const api = new Woden.UserApi();
const defaultClient = Woden.ApiClient.instance;

export const login = (userName) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: userName,
  });
};

const registration = async(user, dispatch) => {
  const password = (encryptData(user.password));
  const { email, name, csr } = user;
  const body = new Woden.CreateUser();
  body.login = name;
  body.email = email;
  body.password = password;
  body.CSR = csr.csrPem;
  body.privateKey = csr.privateKeyPem;
  try {
    api.createUser(
      body, (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else if (response.status === 201) {
          if (JSON.parse(response.text).cert) {
            download(csr.privateKeyPem, `${csr.privateHex}_sk.pem`, 'text/plain');
            download(JSON.parse(response.text).cert, 'cert.pem', 'text/plain');
          }
          message.success('Registration was successful');
          dispatch({
            type: REGISTRATION,
          });
        } else {
          message.error(response.body.message);
        }
      },
    );
    // eslint-disable-next-line no-console
    console.log('CSR:', csr.csrPem);
    // eslint-disable-next-line no-console
    console.log('PrivateKey:', csr.privateKeyPem);
  } catch (e) {
    message.error(e.message, 3);
  }
};
export const regRequest = (user) => async(dispatch) => registration(user, dispatch);

const logIn = async(user, dispatch) => {
  const password = (encryptData(user.password));
  const body = new Woden.Login();
  body.login = user.name;
  body.password = password;
  body.certificate = user.certificate;
  body.privateKey = user.privateKey;
  api.login(
    body, (error, data, response) => {
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 200 && response.body.token) {
        message.success(response.body.message);
        const { token, folder } = response.body;
        localStorage.setItem('token', token);
        localStorage.setItem('rootFolder', folder);
        dispatch(login(user.name));
      } else {
        message.warn(response.body.message);
      }
    },
  );
};
export const loginRequest = (user) => async(dispatch) => {
  await logIn(user, dispatch);
};

export const changePassword = async(userData) => {
  const oldPassword = encryptData(userData.oldPassword);
  const newPassword = encryptData(userData.newPassword);
  const { Bearer } = defaultClient.authentications;
  Bearer.apiKey = await getTokenForHeader();

  const body = new Woden.ChangePassword();
  body.oldPassword = oldPassword;
  body.newPassword = newPassword;
  api.changeUser(body, (error, data, response) => {
    if (error) {
      message.error(response.body.message);
    } else {
      message.success(response.body.message);
    }
  });
};
export const changePasswordRequest = (data) => async(dispatch) => {
  await changePassword(data, dispatch);
};
export const logout = () => async(dispatch) => {
  const { Bearer } = defaultClient.authentications;
  Bearer.apiKey = await getTokenForHeader();
  api.logout((error, data, response) => {
    message.success(response.body.message);
    localStorage.removeItem('token');
    localStorage.removeItem('rootFolder');
    dispatch({
      type: LOGOUT,
    });
  });
};
