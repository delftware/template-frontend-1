import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from 'rebass';
import ListErrors from '../ListErrors'
import FormInput from '../FormInput'
import Form from '../Form';
import { inject, observer } from 'mobx-react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .required('A password is required'),
  passwordConfirm: Yup.string()
    .required('A confirmation of your password is required')
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
});


@inject('authStore')
@withRouter
@observer
export default class ChangePasswordForm extends Component {
    
    render() {
        const { authStore } = this.props;
        const { changePasswordError, changePasswordLoading  } = authStore;
                
        return (
            <Formik
            initialValues={{
                password: '',
                passwordReset: ''
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={values => {
                this.resetPassword(values)
            }}
            render={({ errors, touched, onSubmit }) => (
                <Form loading={changePasswordLoading}>
                    <Box pb={10}>
                        <FormInput name="password" placeholder="Make it strong!" type="password" label="New Password" />
                    </Box>
                    <Box pb={10}>
                        <FormInput name="passwordConfirm" placeholder="Make 'em match!" type="password" label="New Password Confirmation" />
                    </Box>
                    <Box pb={10}>
                        <Button type="submit">Reset Password</Button>
                    </Box>
                    <Box pb={10}>
                        <ListErrors errors={changePasswordError } header="Could not reset your password"/>
                    </Box>
                </Form>
            )}
        />)    
    }

    async resetPassword(values) {
        try {
            await this.props.authStore.changePassword(values, this.props.match.params.hash);
            this.props.history.replace('/login');
        } catch (e) {
            console.error('ERROR', e);
        }
    }
    
}