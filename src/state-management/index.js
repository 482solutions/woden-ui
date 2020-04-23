import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import * as actions from './actions';

export * from './types';
export { actions };

export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
