import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {Button} from 'react-bootstrap';
import {EmailInput, PasswordInput} from 'components';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './validation';
const validate = values => validation(values);
export const fields = [
  'username',
  'password'
];
class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    formError: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {username, password},
      handleSubmit,
      submitting,
      formError
      } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title" type="text" field={username}>
          <EmailInput email={username} />
        </FormGroup>

        <FormGroup controlId="password" type="text" field={password}>
          <PasswordInput password={password} />
        </FormGroup>
        <ErrorBlock error={formError}/>
        <Button type="submit" disabled={submitting} bsSize="large" bsStyle="primary">Login</Button>
      </form>
    );
  }
}
export default reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginForm);
