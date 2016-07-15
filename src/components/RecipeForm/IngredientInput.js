import React, { Component, PropTypes } from 'react';
import { ControlLabel, Col, Row} from 'react-bootstrap';
import FormGroup from 'components/Form/FormGroup';
import Autosuggest from 'components/Form/Autosuggest/Autosuggest';

const IngredientsList = ['Bread', 'Butter'];
const QuantityList = ['1 cup', 'two cups'];

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
          <Autosuggest placeholder="Enter Name" {...name} suggestions={IngredientsList}/>
        </FormGroup>
        </Col>
        <Col xs={12} md={6}>
         <FormGroup controlId={'ingedient-' + (index + 1) + 'quanity'} type="text" field={quantity}>
          <ControlLabel>Quantity</ControlLabel>
          <Autosuggest placeholder="Enter Quantity" {...quantity} suggestions={QuantityList}/>
        </FormGroup>
        </Col>
      </Row>
    );
  }
}
