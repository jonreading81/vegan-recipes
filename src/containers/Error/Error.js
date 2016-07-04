import React, { Component, PropTypes } from 'react';
import NestedStatus from 'react-nested-status';

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
        <div className="container">
          <h1>Doh Error!</h1>
          {children}
        </div>
      </NestedStatus>
    );
  }
}
