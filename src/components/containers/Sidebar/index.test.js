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
  const title = container.getElementsByClassName('sidebarTitle')[0];
  const root = container.getElementsByClassName('ant-tree-node-content-wrapper ant-tree-node-content-wrapper-close');

  expect(title.textContent).toBe('All Folders');
  expect(root.length).toBe(1);
});