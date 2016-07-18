import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {Button, FormControl, ControlLabel} from 'react-bootstrap';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './validation';
const validate = values => validation(values);
export const fields = [
  'givenName',
  'surname',
  'email',
  'password'
];
class RegisterForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    formError: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {givenName, surname, email, password},
      handleSubmit,
      submitting,
      formError
      } = this.props;

    return (<form onSubmit={handleSubmit}>
        <FormGroup controlId="givenName" type="text" field={givenName}>
          <ControlLabel>First name</ControlLabel>
          <FormControl type="text" placeholder="Enter First name" {...givenName}/>
        </FormGroup>

        <FormGroup controlId="surname" type="text" field={surname}>
          <ControlLabel>Last name</ControlLabel>
          <FormControl type="text" placeholder="Enter Last name" {...surname}/>
        </FormGroup>

        <FormGroup controlId="email" type="text" field={email}>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text" placeholder="Enter Email" {...email}/>
        </FormGroup>

        <FormGroup controlId="password" type="text" field={password}>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="text" placeholder="Enter Password" {...password}/>
        </FormGroup>
        <ErrorBlock error={formError}/>
        <Button type="submit" disabled={submitting} bsStyle="primary">Register</Button>
      </form>
    );
  }
}
export default reduxForm({
  form: 'registerForm',
  fields,
  validate
})(RegisterForm);
