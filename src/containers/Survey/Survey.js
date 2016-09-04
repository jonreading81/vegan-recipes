import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {HeroPanel, RadioGroup} from 'components';
import FormGroup from 'components/Form/FormGroup';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './validation';
import {LoadingButton} from 'components';
const validate = values => validation(values);
import {ControlLabel, Button, ButtonToolbar, FormControl} from 'react-bootstrap';
import {submit} from 'redux/modules/survey';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

const fields = [
  'name',
  'email',
  'questionA',
  'questionB',
  'questionC'
];
@connect(
  (state) => {
    return {
      submitting: get(state.survey, 'loading'),
      error: get(state.survey, 'loadError'),
      success: get(state.survey, 'success')
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(submit, dispatch)
    };
  }
)
class Survey extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {name, email, questionA, questionB, questionC},
      handleSubmit,
      onSubmit,
      submitting,
      error,
      success
    } = this.props;

    const styles = require('./Survey.scss');

    return (
    <div>
      <Helmet title="Survey"/>
        <HeroPanel image="forest.jpeg" isEmpty />
        <div className="container">
          <div className="column-medium">
            <If condition={!success}>
              <h2>Survey</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className={styles.formGroup} controlId="name" type="text" field={name}>
                  <FormControl type="text" placeholder="Enter Name" {...name}/>
                </FormGroup>

                <FormGroup className={styles.formGroup} controlId="email" type="text" field={email}>
                  <FormControl type="text" placeholder="Enter Email" {...email}/>
                </FormGroup>

                <FormGroup className={styles.formGroup} controlId="questionA" type="text" field={questionA}>
                   <ControlLabel>Lorem ipsum dolor sit amet, nisl cupiditate nulla lacus vitae dui, velit volutpat aliquam:</ControlLabel>
                    <RadioGroup {...questionA} >
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                    </RadioGroup>
                </FormGroup>

                <FormGroup className={styles.formGroup} controlId="questionB" type="text" field={questionB}>
                  <ControlLabel>Lorem ipsum dolor sit amet, nisl cupiditate nulla lacus vitae dui, velit volutpat aliquam:</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Enter Answer" {...questionB}/>
                </FormGroup>

                <FormGroup className={styles.formGroup} controlId="questionC" type="text" field={questionC}>
                  <ControlLabel>Lorem ipsum dolor sit amet, nisl cupiditate nulla lacus vitae dui, velit volutpat aliquam:</ControlLabel>
                   <FormControl type="text" placeholder="Enter Answer" {...questionC}/>
                </FormGroup>

                <ErrorBlock error={error}/>

                <ButtonToolbar>
                <LoadingButton type="submit" submitting={submitting} bsSize="large" bsStyle="primary">Submit</LoadingButton>
                </ButtonToolbar>
              </form>
            </If>
            <If condition={success}>
               <h2>Survey Submitted</h2>
                <div className="body-copy">
                  <p className="body-copy-first important">Thank you for completing the survey</p>
                </div>
            </If>
          </div>
        </div>
    </div>);
  }
}

export default reduxForm({
  form: 'surveyForm',
  fields,
  validate
})(Survey);

