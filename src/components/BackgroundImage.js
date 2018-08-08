import React, { Component } from 'react';
import { BackgroundImage as RebassBackgroundImage } from 'rebass';
import placeholder from '../icons/placeholder.svg';

export default class BackgroundImage extends Component {

    render() {
        const { src } = this.props;
        const imageSrc = src ? src : placeholder;       
        return (
            <RebassBackgroundImage {...this.props} src={imageSrc} />
        )
    }
}
