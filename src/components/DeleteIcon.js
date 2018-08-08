import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { dark } from '../utils/colors';

export default class DeleteIcon extends Component {
    
    render() {
        const { hideIcon, imageUrl } = this.props;
        let display;
        if (hideIcon || !imageUrl) {
          display = 'none'
        } else {
          display = 'inline-block'
        }
        
        return (<Icon
        bordered 
        color='red' 
        name='trash alternate outline'
        style={{ background: `${dark}`, opacity: 0.9, display, cursor: 'pointer', marginRight: 0 }} 
        {...this.props}
        />)
    }
}
