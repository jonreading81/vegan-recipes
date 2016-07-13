import React, { Component, PropTypes } from 'react';
import {FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import FormGroup from 'components/Form/FormGroup';

export default class IngredientInput extends Component {
  static propTypes = {
    name: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    quantity: PropTypes.object.isRequired,
  };


  render() {
    const { name, quantity, index } = this.props;
    return (
      <Row>
        <Col xs={12} md={6}>
        <FormGroup controlId={'ingedient-' + (index + 1) + 'name'} type="text" field={name}>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="input" placeholder="Enter Name" {...name}/>
        </FormGroup>
        </Col>
        <Col xs={12} md={6}>
         <FormGroup controlId={'ingedient-' + (index + 1) + 'quanity'} type="text" field={quantity}>
          <ControlLabel>Quantity</ControlLabel>
          <FormControl type="input" placeholder="Enter Quantity" {...quantity}/>
        </FormGroup>
        </Col>
      </Row>
    );
  }
}
