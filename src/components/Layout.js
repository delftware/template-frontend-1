import React, { Component } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { Breadcrumbs }from 'react-breadcrumbs';
import { Icon } from 'semantic-ui-react';

const LayoutContainer = styled.div`
    height: 100%
`

export default class Layout extends Component {

    render() {
        const { children, showLogo, showBreadcrumbs } = this.props;
        return (
            <LayoutContainer>
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
                <main id="page-wrap" style={{height:'100%'}}>
                    <Navbar showLogo={showLogo}/>
                    {showBreadcrumbs && <Breadcrumbs separator={<Icon name="arrow right" />} />}
                    {children}
                </main>
            </LayoutContainer>
        )
    }
}
