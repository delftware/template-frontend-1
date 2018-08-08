import React, { Component } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { Form } from 'semantic-ui-react';

const FormError = styled.span`
  color: #9f3a38;
`

export default class FormDropdown extends Component {
    render() {      
      return (
          <Field
          name={this.props.name}
          render={({ field, form }) => {
            const error = form.touched[this.props.name] && form.errors[this.props.name];
            // https://github.com/jaredpalmer/formik/issues/148
            const handleDropdownChange = (e, { name, value }) => form.setFieldValue(name, value)
            const handleOnBlurChange = (e, { name, value }) => form.setFieldValue(name, value)
            return (
              <div>
                <Form.Select 
                  {...field} 
                  {...this.props.rest} 
                  error={error ? true : false} 
                  {...this.props}
                  onChange={handleDropdownChange}
                  onBlur={handleOnBlurChange}
                />
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