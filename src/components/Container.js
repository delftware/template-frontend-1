import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 25px 16px;
`

export default class Container extends Component {

    render() {
        const { children } = this.props;
        return (
            <Wrapper>
                {children}
            </Wrapper>
        )
    }
}
