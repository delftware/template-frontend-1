import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Flex } from 'rebass';
import FormInput from '../FormInput'
import Form from '../Form';
import CardContent from '../CardContent';
import BackgroundImage from '../BackgroundImage';
import ImageUploader from '../ImageUploader';
import SuccessMessage from '../SuccessMessage';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ListErrors from '../ListErrors';
import DeleteIcon from '../DeleteIcon';

const Left = Box.extend`
`

const Spacer = Box.extend`
`

const Right = Box.extend`
`

const LeftButtonBox = Box.extend`
`

const AvatarBox = Box.extend`
    text-align: center;
`

const ProfileImage = styled(BackgroundImage)`
    text-align: right;
`

const AccountSchema = Yup.object().shape({
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
});

@inject('authStore', 'userStore')
@withRouter
@observer
export default class AccountForm extends Component {
    state = {
        hideIcon: true
    }
    

    hideIcon() {
        this.setState({hideIcon: true})
    }
    
    showIcon() {
        this.setState({hideIcon: false})
    }

    componentWillUnmount() {
        this.props.userStore.clearAlerts();
    }

    render() { 
        const { user, userStore, isAdmin } = this.props;
        const { imageUrl, updateUserSuccess, updatingUserErrors, updatingUser } = userStore;

        return (
            <Formik
            initialValues={user}
            validationSchema={AccountSchema}
            onSubmit={values => {                
                this.updateUser(values, isAdmin)
            }}
            render={({ errors, touched, onSubmit }) => (
            <Form loading={updatingUser}>
                <Flex flexWrap='wrap'>
                    <Left w={[ 1, 4 / 10, 4 / 10 ]}>
                        <AvatarBox>
                            <CardContent isClickable={false} extendVertically={false} onMouseEnter={this.showIcon.bind(this)} onMouseLeave={this.hideIcon.bind(this)}>
                                <ProfileImage src={imageUrl} mb={10}>
                                    <DeleteIcon
                                        hideIcon={this.state.hideIcon}
                                        imageUrl={imageUrl}
                                        onClick={(e) => this.deleteImage(e)} 
                                    />
                                </ProfileImage>
                                <ImageUploader handleDropFunction={this.handleDropFunction.bind(this)}/>
                            </CardContent>
                        </AvatarBox>
                        <LeftButtonBox>
                        </LeftButtonBox>
                    </Left>

                    <Spacer w={[ 1, 1 / 10, 2 / 10 ]} />
                    <Right w={[ 1, 5 / 10, 4 / 10 ]}>
                        <Box pb={10}>
                            <FormInput name="firstName" placeholder="John" type="text" label="First Name" />
                        </Box>
                        <Box pb={10}>
                            <FormInput name="lastName" placeholder="Smith" type="text" label="Last Name" />
                        </Box>
                        <Box pb={10}>
                            <FormInput disabled name="email" placeholder="jane@georgetown.edu" type="email" label="Email" />
                        </Box>
                        <Box pb={10}>
                            <FormInput name="password" placeholder="Set a new password" type="password" label="New Password" />
                        </Box>
                        <Flex justifyContent="space-between">
                            <Box>
                                <Button negative onClick={(e) => this.handleClickLogout(e)}>Logout</Button>
                            </Box>
                            <Box>
                                <Button type="submit">Save Changes</Button>
                            </Box>
                        </Flex>
                        <ListErrors errors={updatingUserErrors} />
                        <SuccessMessage show={updateUserSuccess} message="Successfully updated your profile!"/>
                    </Right>
                </Flex>
            </Form>
            )}
        />)    
    }
    
    async handleClickLogout(e) {
        e.preventDefault();
        await this.props.authStore.logout()
        this.props.history.replace('/')
    }

    handleDropFunction(imageFile) {
        this.props.userStore.setProfileImage(imageFile)        
    }

    deleteImage(e) {
        e.preventDefault();
        this.props.userStore.deleteProfileImage()
    }

    updateUser(values, isAdmin) {
        this.props.userStore.updateUser(values, isAdmin)
    }
    
}