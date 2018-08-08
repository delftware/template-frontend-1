import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
    static propTypes = {
        header: PropTypes.string,
        message: PropTypes.string,
        hasError: PropTypes.bool.isRequired,
      }

    static defaultProps = {
        header: "Something went wrong.",
        message: "We could not complete your request.",
    }
      
  render() {
    const { message, hasError, header, children } = this.props;
    if (hasError) {
      return (
          <Message negative>
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
