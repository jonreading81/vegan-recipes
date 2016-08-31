import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './validation';
import {EmailInput, PasswordInput, UserInput, LoadingButton} from 'components';
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
          <UserInput placeholder="Enter First name" field={givenName} />
        </FormGroup>

        <FormGroup controlId="surname" type="text" field={surname}>
          <UserInput placeholder="Enter Last name" field={surname} />
        </FormGroup>

        <FormGroup controlId="email" type="text" field={email}>
          <EmailInput email={email} />
        </FormGroup>

        <FormGroup controlId="password" type="text" field={password}>
           <PasswordInput password={password} />
        </FormGroup>
        <ErrorBlock error={formError}/>
        <LoadingButton type="submit" submitting={submitting} bsSize="large" bsStyle="primary">Register</LoadingButton>
      </form>
    );
  }
}
export default reduxForm({
  form: 'registerForm',
  fields,
  validate
})(RegisterForm);
