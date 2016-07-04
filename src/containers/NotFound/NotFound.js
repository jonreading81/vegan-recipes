import React, { Component } from 'react';
import NestedStatus from 'react-nested-status';

export default class NotFound extends Component {

  render() {
    return (
      <NestedStatus code={404}>
        <div className="container">
          <h1>Doh 404! </h1>
          <p>Page not found.</p>
        </div>
      </NestedStatus>
    );
  }
}
