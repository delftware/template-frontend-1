import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import CrumbRoute from '../components/CrumbRoute';

@inject('userStore', 'commonStore')
@observer
export default class PublicOnlyRoute extends Component {
  render() {
    const { title, userStore, pathToRedirectTo, ...restProps } = this.props;
    if (userStore.currentUser) return <Redirect to={pathToRedirectTo} />;
    if (title) {
      return <CrumbRoute title={title} {...restProps} />;
    } else {
      return <Route {...restProps} />;
    }
  }
}
