import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import CrumbRoute from './CrumbRoute';

@inject('userStore', 'commonStore')
@observer
export default class PrivateRoute extends Component {
  render() {
    const { title, userStore, adminOnly, ...restProps } = this.props;
    if (!userStore.currentUser || (adminOnly && !userStore.currentUser.isAdmin)) return <Redirect to="/" />;
    if (title) {
      return <CrumbRoute title={title} {...restProps} />;
    } else {
      return <Route {...restProps} />;
    }
  }
}
