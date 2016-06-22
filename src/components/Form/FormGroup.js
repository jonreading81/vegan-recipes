import React, { Component, PropTypes } from 'react';
import {FormGroup} from 'react-bootstrap';

export default class ReduxFormFormGroup extends Component {

  static propTypes = {
    controlId: PropTypes.string,
    children: PropTypes.array,
    field: PropTypes.object.required
  };

  getValidationState = (field) => {
    let validationState;
    if (field.touched) {
      if (field.error) {
        validationState = 'error';
      }else {
        validationState = 'success';
      }
    }
    return validationState;
  }

  render() {
    const {field, controlId, children} = this.props;
    return (
      <div>
        <FormGroup controlId={controlId} validationState={this.getValidationState(field)}>
         {children}
        </FormGroup>
      </div>
    );
  }
}

