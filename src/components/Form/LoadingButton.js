import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

export default class LoadingButton extends Component {

  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    type: PropTypes.string,
    children: PropTypes.node,
    bsStyle: PropTypes.string,
    bsSize: PropTypes.string,
    active: PropTypes.bool
  };

  render() {
    const {
      submitting,
      type,
      children,
      bsSize,
      bsStyle,
      active
    } = this.props;
    return (
     <Button type={type} disabled={submitting} bsStyle={bsStyle} bsSize={bsSize} active={active}>
        <If condition={submitting}>
          <i className="fa fa-refresh fa-spin fa-1x fa-fw"></i>&nbsp;
        </If>
        {children}
      </Button>
    );
  }
}

