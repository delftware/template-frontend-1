import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled(Link)`
    color: white;
    text-decoration: none;
    padding-right: 16px;
    &:hover {
      cursor: pointer;
    } 
`


export default class NavLink extends Component {

    render() {
        const { href, children } = this.props;

        return (
            <Nav key={href} to={href}>
                {children}
            </Nav>
        )
    }
}
