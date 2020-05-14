import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FileUpload from './index';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('рендер и обновление счётчика', () => {
  // Тестируем первый рендер и метод componentDidMount
  act(() => {
    ReactDOM.render(<FileUpload/>, container);
  });
  const button = container.querySelector('button');
  expect(button.textContent).toBe('File Upload');

})