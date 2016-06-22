import React, { Component, PropTypes } from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';


export default class ReduxFormFormGroup extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    controlId: PropTypes.string,
    children: PropTypes.array
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
    const {field, controlId, type, label} = this.props;
    return (
      <div>
        <FormGroup controlId={controlId} validationState={this.getValidationState(field)}>
          <ControlLabel>{label}</ControlLabel>
            <FormControl type={type} {...field}/>
            <FormControl.Feedback />
            <HelpBlock field={field}/>
        </FormGroup>
      </div>
    );
  }
}

