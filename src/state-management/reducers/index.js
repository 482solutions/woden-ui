import { combineReducers } from 'redux';

import auth from './auth';
import filesystem from './filesystem';

export default combineReducers({
  auth,
  filesystem,
});
