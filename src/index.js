import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import jwt from 'jsonwebtoken';
import 'antd/dist/antd.css';
import './index.css';
import AppRouter from './routes';
import store, { actions } from './state-management';
import * as serviceWorker from './serviceWorker';

const token = localStorage.getItem('token');
if (token) {
  const { data: userName } = jwt.decode(token);
  if (userName) {
    store.dispatch(actions.login(userName));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Favicon url="../public/favicon.svg"/>
    <AppRouter/>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
