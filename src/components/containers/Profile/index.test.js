import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Profile from './index';

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
    ReactDOM.render(<Profile/>, container);
  });
  const avatar = container.getElementsByClassName('ant-avatar ant-avatar-circle ant-avatar-icon');
  const name = container.getElementsByClassName('userName')[0];

  expect(avatar.length).toBe(1);
  expect(name.textContent).toBe('loading');
});
