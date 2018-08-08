import React, { Component } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { Form } from 'semantic-ui-react';

const FormError = styled.span`
  color: #9f3a38;
`

export default class FormInput extends Component {
    render() {
        return (
            <Field
            name={this.props.name}
            render={({ field, form }) => {
              const error = form.touched[this.props.name] && form.errors[this.props.name];
              return (
                <div>
                  <Form.Input {...field} {...this.props.rest} error={error ? true : false} {...this.props} />
                  {form.errors[this.props.name] &&
                    form.touched[this.props.name] && (
                      <FormError>{form.errors[this.props.name]}</FormError>
                  )}
                </div>
              );
            }}
          />
        )
    }
}