import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './index';

it('renders without crashing', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Profile />, container);
  ReactDOM.unmountComponentAtNode(container);
});
