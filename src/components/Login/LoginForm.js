import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from 'rebass';
import ListErrors from '../ListErrors'
import FormInput from '../FormInput'
import Form from '../Form';
import HyperlinkButton from '../HyperlinkButton';
import { inject, observer } from 'mobx-react';
import { Button } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage';

const AccountSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });

  
@inject('authStore')
@withRouter
@observer
export default class AccountForm extends Component {
    constructor() {
        super();
        this.state = {
            isLoggingIn: true
        }
    } 
    render() { 
        const { authStore } = this.props;
        const { loginPageError, resetPasswordSuccess, loginLoading } = authStore;                   
        const { isLoggingIn } = this.state;
        
        return (
            <Formik
            initialValues={{
            email: '',
            password: ''
            }}
            validationSchema={isLoggingIn ? AccountSchema : ResetPasswordSchema}
            onSubmit={values => {
                if (isLoggingIn) {
                    this.loginUser(values)
                } else {
                    this.requestPasswordReset(values)
                }
            }}
            render={({ errors, touched, onSubmit }) => (
                <Form loading={loginLoading}>
                    <Box pb={10}>
                        <FormInput name="email" placeholder="jane@georgetown.edu" type="email" label="Email" />
                    </Box>
                    {isLoggingIn && <Box pb={10}>
                        <FormInput name="password" type="password" label="Password" />
                    </Box>}
                    <Box pb={10}>
                        <Button type="submit">{isLoggingIn ? 'Login' : 'Request Password Reset'}</Button>
                    </Box>
                    <Box pb={10}>
                        <HyperlinkButton onClick={(e) => this.toggleIsLoggingIn(e)}>{isLoggingIn ? 'Forgot your password?' : 'Bring me back to login'}</HyperlinkButton>
                    </Box>
                    <Box pb={10}>
                        <Link to="/register">New? Click here to request to join.</Link>
                    </Box>
                        <div>
                            {!this.state.isLoggingIn && <SuccessMessage show={resetPasswordSuccess} message="We have sent you an email to reset your password." />}
                            <ListErrors errors={loginPageError } header={this.state.isLoggingIn ? "Error logging in." : "Error sending password reset email."}/>
                        </div>
                </Form>
            )}
        />)
    }
    
    toggleIsLoggingIn(e) {
        e.preventDefault();
        this.props.authStore.clearAlerts();
        this.setState({isLoggingIn: !this.state.isLoggingIn});
    }

    async requestPasswordReset(values) {
        try {
            await this.props.authStore.resetPassword(values)
          } catch(e) {
          }    
    }

    async loginUser(values) {
        try {
          await this.props.authStore.login(values)
          this.props.history.replace('/account')
        } catch(e) {
        }
    }
}