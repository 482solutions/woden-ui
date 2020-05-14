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
  const avatar = container.getElementsByTagName('Avatar');
  const name = container.querySelector('div');

  expect(avatar.length).toBe(0);
  expect(name.textContent).toBe('loading');
});