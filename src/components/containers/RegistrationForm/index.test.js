import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import configureMockStore from 'redux-mock-store';
import RegistrationForm from './index';

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
        <RegistrationForm/>
      </Router>,
      container,
    );
  });

  const registrationElement = container.getElementsByClassName('registrationElement');
  const inputs = container.getElementsByTagName('input');

  expect(registrationElement.length).toBe(1);
  expect(inputs[0].id).toBe('name');
  expect(inputs[1].id).toBe('email');
  expect(inputs[2].id).toBe('password');
  expect(inputs[3].id).toBe('confirm');
});
