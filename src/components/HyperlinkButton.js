import React, { Component } from 'react';
import styled from 'styled-components';

const FormattedLink = styled.a`
    cursor: pointer;
`;

export default class HyperlinkButton extends Component {

    render() {
        return (
            <FormattedLink {...this.props} >
                {this.props.children}
            </FormattedLink>
        )
    }
}
