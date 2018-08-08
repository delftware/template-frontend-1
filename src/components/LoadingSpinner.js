import React, { Component } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { dark } from '../utils/colors';
import { Box, Flex } from 'rebass';

const LoadingContainer = Flex.extend`
    padding: ${props => 
      props.loading ? '40px' : '0px'
    };
`

export default class LoadingSpinner extends Component {
    static propTypes = {
        color: PropTypes.string,
        loading: PropTypes.bool.isRequired
      }
    
    static defaultProps = {
        color: dark,
        loading: true
    }
      
  render() {
    const { loading, color } = this.props;
    return (
      <LoadingContainer loading={loading ? 1 : 0} justifyContent="center">
        <Box>
          <ClimbingBoxLoader
            color={color} 
            loading={loading} 
          />
        </Box>
      </LoadingContainer>
    )
  }
}
