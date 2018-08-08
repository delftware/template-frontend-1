import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RegisterForm from './RegisterForm';
import Layout from "../Layout";
import { Box, Flex, Subhead } from 'rebass';
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import { Helmet } from "react-helmet";

@inject('authStore')
@observer
export default class Register extends Component {

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <Container>
          <Heading>JOIN</Heading>
          <Flex flexWrap="wrap">
            <Box width={[ 1,  1 / 2 ]}>
              <Subhead py={20}>Tell them why they should join here!</Subhead>
            </Box>
            <Box width={[ 1, 1 / 2 ]}>
              <RegisterForm />
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }

} 
