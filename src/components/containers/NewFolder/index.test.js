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
  const button = container.querySelector('button');
  const modal = container.getElementsByTagName('Modal');

  expect(button.textContent).toBe('New Folder');
  expect(modal.length).toBe(0);
});