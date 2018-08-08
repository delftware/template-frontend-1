import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';
import { inject, observer } from 'mobx-react';
import { navbarHeight } from '../utils/sizes';
import { dark } from '../utils/colors';
import NavLink from './NavLink';
import Avatar from './Avatar';
import logo from '../icons/logo/clc.svg';

const NavbarResponsiveContainer = styled.div`
    ${breakpoint('mobile') `
        display: none;
    `}

    ${breakpoint('desktop') `
        display: inline-block;
    `}
`
const NavbarWrapper = styled.div`
    color: white;
    height: ${navbarHeight};
    background: ${dark};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LeftNavbar = styled.div`
    padding-left: 16px;
`

const RightNavbar = styled.div`
    padding-right: ${props => 
        props.currentUser ? '45px' : '0px'
    };
`

const Logo = styled.img`
    height: 40px;
    &:hover {
      cursor: pointer;
    } 
`

const AvatarLink = styled.span`
    position: absolute;
    top: 13px;
    right: 19px;
`

@inject('userStore')
@observer
export default class Navbar extends Component {
    static defaultProps = {
        showLogo: true,
    }
    
    render() {
        const { showLogo, userStore } = this.props;
        const { currentUser } = userStore;
        return (
            <NavbarWrapper>
                <LeftNavbar>
                    {showLogo && <Link to="/">
                        <Logo src={logo} />
                    </Link>}
                </LeftNavbar>
                <NavbarResponsiveContainer>
                    <RightNavbar currentUser={currentUser}>
                        {currentUser &&
                            <NavLink href="/account">
                                <AvatarLink>
                                    <Avatar size={40} user={currentUser}/>
                                </AvatarLink>
                            </NavLink>
                        }
                        {!currentUser && 
                            <NavLink key={"/register"} href={"/register"}>Sign Up</NavLink>
                        }
                        {!currentUser && 
                            <NavLink key={"/login"} href={"/login"}>Login</NavLink>
                        }
                    </RightNavbar>
                </NavbarResponsiveContainer>
            </NavbarWrapper>
        )
    }
}
