import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import ErrorBlock from 'components/Form/ErrorBlock';
import {EmailInput, UserInput, LoadingButton} from 'components';
import validation from './validation';
import { subscribeUser, hideSubscribeUser } from 'redux/modules/mailchimp';

const fields = ['email', 'name', 'listId'];
const validate = values => validation(values);

const mapStateToProps = ({mailchimp = {} }, {listId}) => {
  return {
    initialValues: {listId},
    formError: mailchimp.error,
    subscribed: mailchimp.subscribed,
    displayed: mailchimp.displayed
  };
};

const actionCreators = {
  subscribeUserAction: subscribeUser,
  hideSubscribeUserAction: hideSubscribeUser
};

class MailChimpSubscription extends Component {

  render() {
    const {
      fields: {name, email},
      title,
      handleSubmit,
      subscribeUserAction,
      hideSubscribeUserAction,
      submitting,
      subscribed,
      displayed,
      formError
    } = this.props;

    const styles = require('./styles.scss');
    return (
      <div className={displayed ? styles.wrapper : styles.wrapperHidden}>
        <i onClick={hideSubscribeUserAction}
          className={`fa fa-window-close ${styles.close}`}
          aria-hidden="true">
        </i>
        <If condition={subscribed}>
          <h2>Thankyou for subscribing!</h2>
        </If>
        <If condition={!subscribed}>
          <h2>{title}</h2>
          <form onSubmit={handleSubmit(subscribeUserAction)}>
            <FormGroup controlId="name" type="text" field={name}>
              <UserInput placeholder="Enter name" field={name} />
            </FormGroup>
            <FormGroup controlId="email" type="text" field={email}>
              <EmailInput email={email} />
            </FormGroup>
            <ErrorBlock error={formError}/>
            <LoadingButton
              className={styles.button}
              type="submit"
              submitting={submitting}
              bsSize="large"
              bsStyle="primary"
            >Subscribe</LoadingButton>
          </form>
        </If>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(
  reduxForm(
    {
      form: 'mailchimp',
      fields,
      validate
    })(MailChimpSubscription)
);
