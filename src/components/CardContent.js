import React, { Component } from 'react';
import { css } from 'styled-components';
import { Card } from 'rebass';

const CardContentContainer = Card.extend`
    box-shadow: rgb(238, 238, 238) 0px 0px 0px 1px inset, rgb(238, 238, 238) 0px 0px 4px;
    border-radius: 4px;
    ${props => props.extendVertically ? 'min-height:100%' : ''};
    ${props => props.isClickable && css`
        transition: all .25s ease-in-out;
        &:hover {
            transform: scale(.98);
            cursor: pointer;
        }
    `}
`

export default class CardContent extends Component {

    static defaultProps = {
        extendVertically: true
    }

    render() {
        return (
            <CardContentContainer isClickable={this.props.isClickable} extendVertically={this.props.extendVertically} {...this.props} >
                {this.props.children}
            </CardContentContainer>
        )
    }
}
