import React, { Component } from 'react';
import NestedStatus from 'react-nested-status';
import {HeroPanel} from 'components';

export default class NotFound extends Component {

  render() {
    return (
      <NestedStatus code={404}>
      <div>
       <HeroPanel image="forest.jpeg" isEmpty />
          <div className="container">
              <div className="body-copy">
              <h1>404</h1>
               <h2>Page not found.</h2>
               </div>
          </div>
      </div>
      </NestedStatus>
    );
  }
}
