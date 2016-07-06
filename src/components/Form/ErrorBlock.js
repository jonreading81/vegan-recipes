import React, { Component, PropTypes } from 'react';
import {HelpBlock} from 'react-bootstrap';
import {isDefined} from 'components';
import get from 'lodash/get';


export default class ErrorBlock extends Component {

  static propTypes = {
    error: PropTypes.object
  };

  render() {
    const {error} = this.props;
    return (
      <isDefined param={error}>
        <div className="has-error">
         <HelpBlock>{get(error, 'message')}</HelpBlock>
        </div>
      </isDefined>
    );
  }
}

