import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    return (
      <div>
        <Helmet title="Home"/>
        <div className="container">
        <h1>{config.app.title}</h1>
          <h2>{config.app.description}</h2>
         </div>
      </div>
    );
  }
}
