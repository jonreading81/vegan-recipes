import React, { Component } from 'react';
import NestedStatus from 'react-nested-status';
import {HeroPanel} from 'components';

export default class NotFound extends Component {

  render() {
    return (
      <NestedStatus code={404}>
        <div>
          <HeroPanel isEmpty image="forest.jpeg" />
          <div className="container">
            <h1>Doh 404! </h1>
            <p>Page not found.</p>
          </div>
        </div>
      </NestedStatus>
    );
  }
}
