import React, { Component } from 'react';
import { Form } from 'formik';


export default class CustomForm extends Component {

    render() {
        const { loading } = this.props;
        let loadingString;
        if (loading) { 
            loadingString = 'loading'
        }
        const className = `ui form ${loadingString}`;
        
        return (
            <Form className={className}>
                {this.props.children}
            </Form>
        )
    }
}
