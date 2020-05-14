import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Data from './index';

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
    ReactDOM.render(<Data/>, container);
  });
  const image = container.querySelector('img');
  expect(image.innerHTML).toBe('');

})