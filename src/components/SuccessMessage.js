import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export default class SuccessMessage extends Component {
    static propTypes = {
        header: PropTypes.string,
        message: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
      }

    static defaultProps = {
        header: "Success!",
    }
      
  render() {
    const { message, show, header, children } = this.props;
    if (show) {
      return (
          <Message positive>
              <Message.Header>{header}</Message.Header>
              <p>{message}</p>
              {children}
          </Message>
      )  
    } else {
      return <div />
    }
  }
}
