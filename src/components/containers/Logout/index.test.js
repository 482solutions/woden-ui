import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Logout } from './index';

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
    render(
      <Logout/>,
      container,
    );
  });

  const logoutElement = container.getElementsByClassName('button');

  expect(logoutElement.length).toBe(1);
});
