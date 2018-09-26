import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import ErrorBlock from 'components/Form/ErrorBlock';
import {EmailInput, UserInput, LoadingButton} from 'components';
import validation from './validation';
import {subscribeUser as subscribeUserAction} from 'redux/modules/mailchimp';

const fields = ['email', 'name', 'listId'];
const validate = values => validation(values);
const mapStateToProps = ({mailchimp}, {listId}) => {
  return {
    initialValues: {listId},
    formError: mailchimp && mailchimp.error,
    subscribed: mailchimp && mailchimp.subscribed
  };
};

const actionCreators = { subscribeUser: subscribeUserAction };

const MailChimpSubscription = (props) => {
  const {
    fields: {name, email},
    title,
    handleSubmit,
    subscribeUser,
    submitting,
    subscribed,
    formError
    } = props;
  return (
    <div>
      <If condition={subscribed}>
        <h1>Thankyou for subscribing</h1>
      </If>
      <If condition={!subscribed}>
        <h1>{title}</h1>
        <form onSubmit={handleSubmit(subscribeUser)}>
          <FormGroup controlId="name" type="text" field={name}>
            <UserInput placeholder="Enter name" field={name} />
          </FormGroup>
          <FormGroup controlId="email" type="text" field={email}>
            <EmailInput email={email} />
          </FormGroup>
          <ErrorBlock error={formError}/>
          <LoadingButton type="submit" submitting={submitting} bsSize="large" bsStyle="primary">Subscribe</LoadingButton>
        </form>
      </If>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(
  reduxForm(
    {
      form: 'mailchimp',
      fields,
      validate
    })(MailChimpSubscription)
);
