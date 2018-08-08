import React, { Component } from 'react';
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';
import { Box, Flex } from 'rebass';
import Routes from '../routes';

// App 
import LoadingSpinner from './LoadingSpinner';

const AppContainer = styled.div`
  height: 100%;
  background: white;
`

const LoadingFlex = Flex.extend `
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


@inject('userStore', 'commonStore')
@observer
export default class App extends Component {

  state = {
    enoughTimeHasPassedToDisplaySpinner: false
  }

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    setTimeout(() => {        
      this.setState({ enoughTimeHasPassedToDisplaySpinner: true });
    }, 600);

    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <AppContainer>
          <Routes />
        </AppContainer>
      );
    }
    return (
      <AppContainer>
        <LoadingFlex>
          <Box width={[ 1 ]}>
           {this.state.enoughTimeHasPassedToDisplaySpinner && <LoadingSpinner loading={true} />}
          </Box>
        </LoadingFlex>
      </AppContainer>
    );
  }
}