import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import NewFolder from './index';

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
    ReactDOM.render(<NewFolder/>, container);
  });

  const button = container.getElementsByClassName('ant-btn')[0];

  // Не могу проверить наличие модального окна т.к. его нет на странице и надо проверять через redux

  expect(button.textContent).toBe('New Folder');
});
