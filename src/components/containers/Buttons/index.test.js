import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { FileAddTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import Buttons from './index';

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
    ReactDOM.render(<Buttons/>, container);
  });
  const uploadFile = container.getElementsByClassName('upload-button')[0];
  const newFolder = container.getElementsByClassName('createFolder');

  expect(uploadFile.textContent).toBe('File Upload');
  expect(newFolder.length).toBe(1);
});
