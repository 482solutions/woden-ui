import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import {
  Home,
  Login,
  NotFound,
} from "../pages";

import PrivateRouter from './PrivateRoute';

export default () => (
  <Router>
    <App>
      <Switch>
        <PrivateRouter exact path="/" component={Home} redirect="/login" />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
)
