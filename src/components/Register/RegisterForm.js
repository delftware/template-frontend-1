import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from 'rebass';
import FormInput from '../FormInput'
import Form from '../Form';
import { inject, observer } from 'mobx-react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ListErrors from '../ListErrors';


const ButtonBox = Box.extend`
    text-align: right;
`

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('An email address is required'),
  firstName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('A first name is required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a last name that long')
    .required('A last name is required'),
  password: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .required('A password is required'),
  passwordConfirm: Yup.string()
    .required('A confirmation of your password is required')
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
});

@withRouter
@inject('authStore')
@observer
export default class RegisterForm extends Component {
  render() {
    const { authStore } = this.props;
    const { registerPageError, registrationLoading } = authStore;
    return (
      <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        this.registerUser(values)
      }}
      render={({ errors, touched, onSubmit }) => (
        <Form loading={registrationLoading}>
          <Box pb={10}>
            <FormInput name="firstName" placeholder="Jane" type="text" label="First Name" />
          </Box>
          <Box pb={10}>
            <FormInput name="lastName" placeholder="Smith" type="text" label="Last Name" />
          </Box>
          <Box pb={10}>
            <FormInput name="email" placeholder="jane@georgetown.edu" type="email" label="Email" />
          </Box>
          <Box pb={10}>
            <FormInput name="password" placeholder="Make it strong!" type="password" label="Password" />
          </Box>
          <Box pb={10}>
            <FormInput name="passwordConfirm" placeholder="Make 'em match!" type="password" label="Password Confirmation" />
          </Box>
          <ButtonBox>
            <Button type="submit">Join</Button>
          </ButtonBox>
          <ListErrors errors={registerPageError} header="There was a problem signing you up." />
        </Form>
      )}
    />
    )
  }

  async registerUser(values) {
    await this.props.authStore.register(values)
    this.props.history.replace('/account')
  }
}