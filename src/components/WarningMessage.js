import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export default class SuccessMessage extends Component {
    static propTypes = {
        bullets: PropTypes.array,
        header: PropTypes.string,
        message: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
      }
      
  render() {
    const { message, show, header, children, bullets } = this.props;
    if (show) {
      return (
          <Message warning>
              {header && <Message.Header>{header}</Message.Header>}
              <p>{message}</p>
              {bullets && 
                <ul>
                  {bullets.map((b, i)=> {
                    return <li key={i}>{b}</li>
                  })}
                </ul>
              }
              {children}
          </Message>
      )  
    } else {
      return <div />
    }
  }
}
