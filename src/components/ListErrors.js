import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ListErrors extends Component {
  static propTypes = {
    header: PropTypes.string,
    errors: PropTypes.object.isRequired,
  }

  static defaultProps = {
      header: "Something went wrong.",
  }

  render() {
    const { errors, header } = this.props;
    if (errors) {
      return (
        <Message negative>
          <Message.Header>{header}</Message.Header>
          {
            Object.keys(errors).map(key => {
              return (
                <p key={key}>
                  {errors[key]}
                </p>
              );
            })
          }
        </Message>
      );
    } else {
      return null;
    }
  }
}