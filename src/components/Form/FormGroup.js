import React, { Component, PropTypes } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';

export default class ReduxFormFormGroup extends Component {

  static propTypes = {
    controlId: PropTypes.string,
    children: PropTypes.array,
    field: PropTypes.object
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
        <FormGroup controlId={controlId} validationState={this.getValidationState(field)}>
          {children}
          <FormControl.Feedback />
          <HelpBlock field={field}/>
        </FormGroup>
    );
  }
}

