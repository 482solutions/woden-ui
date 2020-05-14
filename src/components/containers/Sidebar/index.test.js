import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Sidebar from './index';

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
    ReactDOM.render(<Sidebar/>, container);
  });
  const title = container.querySelector('h2');
  const root = container.getElementsByTagName('foldersTree');

  expect(title.textContent).toBe('All Folders');
  expect(root.length).toBe(0);
});