import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../Layout";
import { Box, Flex } from 'rebass';
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import ChangePasswordForm from './ChangePasswordForm';
import { Helmet } from "react-helmet";

@inject('authStore')
@observer
export default class Account extends Component {

  render() {
    return (
        <Layout>
            <Helmet>
                <title>Change Password</title>
            </Helmet>
            <Container>
                <Heading>CHANGE PASSWORD</Heading>
                <Flex flexWrap='wrap'>
                    <Box width={[ 1, 1 / 2 ]}>
                        <ChangePasswordForm />
                    </Box>
                </Flex>
            </Container>
        </Layout>
    )
  }
} 
