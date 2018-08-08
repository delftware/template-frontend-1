import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';

export default class Avatar extends Component {

    render() {
        const { user, size } = this.props;        
        const {firstName, lastName, image } = user;
        return (
            <UserAvatar size={size} name={`${firstName} ${lastName}`} src={image} />
        )
    }
}
