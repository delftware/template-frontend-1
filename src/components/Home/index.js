import React, { Component } from 'react';
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";

export default class Home extends Component {

    render() {        
        return (
            <Layout showLogo={true}>
              <Helmet>
                <title>New Website</title>
              </Helmet>
              <div>
                Welcome to your new website!
              </div>
            </Layout>
        )
    }
}
