import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import 'antd/dist/antd.css';
import './index.css';
import AppRouter from './routes';
import store, { actions } from './state-management';
import * as serviceWorker from './serviceWorker';
import { functions } from "./utils";

const token = localStorage.getItem('token');
if (token) {
  console.log(jwt.decode(token));
  const { user_id } = jwt.decode(token);
  if (user_id) {
    functions.setAuthorizationToken(token);
    store.dispatch(actions.login(user_id));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <AppRouter/>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
