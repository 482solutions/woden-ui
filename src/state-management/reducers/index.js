import { combineReducers } from 'redux';

import auth from './auth';
import filesystem from './filesystem';
import permissions from './permissions';
import voting from './voting';

export default combineReducers({
  auth,
  filesystem,
  permissions,
  voting
});
