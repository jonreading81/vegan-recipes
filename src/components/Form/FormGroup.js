import React, { Component, PropTypes } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';

export default class ReduxFormFormGroup extends Component {

  static propTypes = {
    controlId: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
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
    const {field, controlId, children, className, inline} = this.props;
    const styles = require('./FormGroup.scss');
    const helpBlockClassName = inline ? styles.inlineHelpBlock : '';
    return (
        <FormGroup bsClass={className} className={styles.formGroup} controlId={controlId} validationState={this.getValidationState(field)}>
          {children}
          <FormControl.Feedback />
          <HelpBlock field={field} helpBlockClassName={helpBlockClassName} />
        </FormGroup>
    );
  }
}

