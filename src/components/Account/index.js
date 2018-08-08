import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../Layout";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import AccountForm from './AccountForm';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Helmet } from "react-helmet";

@inject('userStore')
@observer
export default class Account extends Component {

  componentDidMount() {
    this.props.userStore.pullUser();
}

  render() {
    const { userStore } = this.props;
    const { fetchUserError, isFetchingUser, currentUser } = userStore;

    let bullets = [];
    if (!currentUser.confirmedEmail) bullets.push("Confirm your email via a link we sent you on sign up");
    if (!currentUser.isActiveMember) bullets.push("Be approved by an admin")
    
    return (
      <Layout>
        <Helmet>
          <title>Account</title>
        </Helmet>
        <Container>
          <Heading>ACCOUNT</Heading>
          <ErrorMessage hasError={fetchUserError} />
          <LoadingSpinner loading={isFetchingUser} />
          {!isFetchingUser && <AccountForm user={currentUser} isAdmin={false} />}
        </Container>
      </Layout>
    )
  }

  async handleResendVerification(e) {
    e.preventDefault();
    await this.props.userStore.resendVerification()
  }
} 
