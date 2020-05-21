import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FileInMemory from './index';

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
    ReactDOM.render(<FileInMemory/>, container);
  });
  const identity = container.getElementsByClassName('ant-upload ant-upload-btn');

  expect(identity.length).toBe(1);
});
