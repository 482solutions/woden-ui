import { combineReducers } from "redux";

import auth from "./auth";
import filesystem from "./filesystem";
import permissions from "./permissions";

//----------------------------------------------------------------------------------------------------------------------

export default combineReducers({
  auth,
  filesystem,
  permissions,
});