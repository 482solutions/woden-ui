import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Loading from './index';

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
    ReactDOM.render(<Loading isFullScreen={true}/>, container);
  });

  const loading = container.getElementsByClassName('loading-full');
  const spin = loading[0].getElementsByClassName('ant-spin-dot ant-spin-dot-spin');

  expect(spin.length).toBe(1);
});
