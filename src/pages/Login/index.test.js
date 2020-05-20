import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Login from './index';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(<Login/>, container);
  });
  const loginForm = container.getElementById('LoginForm')[0];
  const image = container.getElementById('LoginImage')[0];

  expect(loginForm.length).toBe(1);
  expect(image.length).toBe(1);
});
