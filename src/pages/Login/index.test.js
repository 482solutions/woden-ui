import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Login from './index';
import { LOGIN } from '../../state-management/types';
import { login } from '../../state-management/actions';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// it('renders without crashing', () => {
//   act(() => {
//     ReactDOM.render(<Login/>, container);
//   });
//   const loginForm = container.getElementById('LoginForm')[0];
//   const image = container.getElementById('LoginImage')[0];
//
//   expect(loginForm.length).toBe(1);
//   expect(image.length).toBe(1);
// });


// describe('login', () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });
//
//   it('should login user', () => {
//     const expectedAction = [
//       { type: LOGIN },
//     ];
//     login('testName');
//
//     const store = mockStore({ name: [] });
//
//     return store.dispatch(login.isLoggedIn()).await(() => {
//       expect(store.getActions(login('userName'))).toEqual(expectedAction);
//     });
//
//     expect(login('testName')).toEqual(expectedAction);
//   });
// });
