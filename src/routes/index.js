import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Account from '../components/Account';
import PrivateRoute from '../components/PrivateRoute';
import PublicOnlyRoute from '../components/PublicOnlyRoute';
import ChangePassword from '../components/ChangePassword';
import VerifyEmail from '../components/VerifyEmail';
import ScrollToTop from '../components/ScrollToTop';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicOnlyRoute exact path="/login" component={Login} pathToRedirectTo="/account"/>
            <Route path="/changePassword/:hash" component={ChangePassword} />
            <Route path="/verify/:hash" component={VerifyEmail} />
            <PublicOnlyRoute path="/register" pathToRedirectTo="/account" component={Register} />
            <PrivateRoute path="/account" component={Account} />
            <Route component={Home} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}