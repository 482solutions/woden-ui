import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ChangePassword from './index';

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
    ReactDOM.render(<ChangePassword/>, container);
  });
  const changeOldPassword = container.getElementsByClassName('ant-btn');

  expect(changeOldPassword.length).toBe(1);
});
