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
  const visible [setVisible, ]

  act(() => {
    ReactDOM.render(<ChangePassword/>, container);
  });
  const passwordElement = container.getElementById('passwordElement');
  const inputs = container.getElementsByTagName('input');

  expect(passwordElement.length).toBe(1);
  expect(inputs[0].id).toBe('oldPassword');
  expect(inputs[1].id).toBe('newPassword');
  expect(inputs[2].id).toBe('confirmPassword');
});
