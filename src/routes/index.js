import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import {
  Home,
  Login,
  NotFound,
  Registration,
} from '../pages';

import PrivateRouter from './PrivateRoute';

const AppRouter = () => (
  <Router>
    <App>
      <Switch>
        <PrivateRouter exact path="/" component={Home} redirect="/login"/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registration" component={Registration}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
);

export default AppRouter;
