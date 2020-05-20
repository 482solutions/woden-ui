import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { login } from '../../../state-management/actions';
import { LOGIN } from '../../../state-management/types';
import { LoginForm } from './index';

let container;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createBrowserHistory();

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener() {
    },
    removeListener() {
    },
  };
};

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(
      <Router history={history}>
        <LoginForm/>
      </Router>,
      container,
    );
  });
  const loginElement = container.getElementsByClassName('ant-form');

  expect(loginElement.length).toBe(1);
});

describe('login', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should login user', () => {
    const expectedAction = [
      { type: LOGIN },
    ];
    login('testName');

    const store = mockStore({ name: [] });

    return store.dispatch(login.isLoggedIn()).await(() => {
      expect(store.getActions(login('userName'))).toEqual(expectedAction);
    });

    expect(login('testName')).toEqual(expectedAction);
  });
});
