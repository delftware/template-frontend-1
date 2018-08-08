import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Layout from "../Layout";
import { Box, Flex } from 'rebass';
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import SuccessMessage from '../SuccessMessage';
import ListErrors from '../ListErrors';
import { Helmet } from "react-helmet";

@inject('authStore')
@observer
export default class VerifyEmail extends Component {

    componentDidMount() {
        this.verifyEmail();
    }
    
    render() {
        const { authStore } = this.props;
        const { verifyEmailError, verifyEmailSuccess } = authStore;
        return (
            <Layout>
                <Helmet>
                    <title>Verify Email</title>
                </Helmet>
                <Container>
                    <Heading>Confirm Email</Heading>
                    <Flex justifyContent="center" flexDirection="column">
                        <Box width={[ 1 ]}>
                            <ListErrors header="Email Verification Failed" errors={verifyEmailError} />
                            <SuccessMessage show={verifyEmailSuccess} message="Successfully Verified Your Email!">
                                <Link to="/">Bring Me Home</Link>
                            </SuccessMessage>
                        </Box>
                    </Flex>
                </Container>
            </Layout>
        )
    }
    
    async verifyEmail() {
        try {
            await this.props.authStore.verifyEmail(this.props.match.params.hash);
        } catch (e) {
            console.error('ERROR', e);
        }
    }
} 
