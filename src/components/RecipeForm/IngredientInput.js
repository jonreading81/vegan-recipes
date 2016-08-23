import React, { Component, PropTypes } from 'react';
import { ControlLabel, Col, Row} from 'react-bootstrap';
import FormGroup from 'components/Form/FormGroup';
import Autosuggest from 'components/Form/Autosuggest/Autosuggest';

export default class IngredientInput extends Component {
  static propTypes = {
    name: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    quantity: PropTypes.object.isRequired,
    ingredientList: PropTypes.array.isRequired,
    quantityList: PropTypes.array.isRequired,
  };

  render() {
    const { name, quantity, index, ingredientList, quantityList } = this.props;
    return (
      <Row>
        <Col xs={12} sm={6}>
        <FormGroup controlId={'ingedient-' + (index + 1) + 'name'} type="text" field={name}>
          <ControlLabel>Name</ControlLabel>
          <Autosuggest placeholder="Enter Name" {...name} suggestions={ingredientList}/>
        </FormGroup>
        </Col>
        <Col xs={12} sm={6}>
         <FormGroup controlId={'ingedient-' + (index + 1) + 'quanity'} type="text" field={quantity}>
          <ControlLabel>Quantity</ControlLabel>
          <Autosuggest placeholder="Enter Quantity" {...quantity} suggestions={quantityList}/>
        </FormGroup>
        </Col>
      </Row>
    );
  }
}
