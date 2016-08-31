import React, { Component, PropTypes } from 'react';
import NestedStatus from 'react-nested-status';
import {HeroPanel} from 'components';

export default class Error extends Component {

  static propTypes = {
    code: PropTypes.object,
    error: PropTypes.object,
    children: PropTypes.object
  }

  render() {
    const {code, children} = this.props;
    return (
      <NestedStatus code={code}>
           <div>
       <HeroPanel image="forest.jpeg" isEmpty />
          <div className="container">
              <div className="body-copy">
              <h1>Doh Error</h1>
              {children}
              </div>
          </div>
      </div>
      </NestedStatus>
    );
  }
}
