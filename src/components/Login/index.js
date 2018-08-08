import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Layout from "../Layout";
import { Box, Flex } from 'rebass';
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import LoginForm from './LoginForm';
import { Helmet } from "react-helmet";

@inject('authStore')
@observer
export default class Account extends Component {
    render() {
        return (
            <Layout>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <Container>
                <Heading>LOGIN</Heading>
                <Flex flexWrap='wrap'>
                    <Box width={[ 1, 1 / 2 ]}>
                        <LoginForm />
                    </Box>
                </Flex>
                </Container>
            </Layout>
        )
    }
} 
