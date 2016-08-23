import React, { Component, PropTypes } from 'react';
import {ControlLabel, Col, Row} from 'react-bootstrap';


export default class HorizontalFormControl extends Component {

  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    className: PropTypes.string
  };
  render() {
    const {children, label, className} = this.props;
    return (
      <Row className={className}>
        <Col componentClass={ControlLabel} sm="3">{label}</Col>
        <Col sm="9">{children}</Col>
      </Row>
    );
  }
}

