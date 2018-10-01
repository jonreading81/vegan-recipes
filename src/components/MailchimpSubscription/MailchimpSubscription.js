import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
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

  constructor(props) {
    super(props);
    this.state = {
      shouldAnimate: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const shouldAnimate = this.props.displayed !== nextProps.displayed;
    if (this.state.shouldAnimate !== shouldAnimate) {
      this.setState({shouldAnimate});
    }
  }

  componentDidUpdate() {
    const {displayed} = this.props;
    const {shouldAnimate} = this.state;
    const {wrapper} = this.refs;
    const {clientHeight} = wrapper;

    if (displayed && shouldAnimate) {
      wrapper.style.height = 0;
      setTimeout(() => wrapper.style.height = `${clientHeight}px`, 0);
    }else {
      wrapper.style.height = null;
    }
  }

  render() {
    const {
      fields: {name, email},
      handleSubmit,
      subscribeUserAction,
      hideSubscribeUserAction,
      submitting,
      subscribed,
      displayed,
      formError,
    } = this.props;

    const styles = require('./styles.scss');
    return (
      <div ref="wrapper" className={displayed ? styles.wrapper : styles.wrapperHidden}>
        <If condition={!subscribed}>
          <i onClick={hideSubscribeUserAction}
            className={`fa fa-window-close ${styles.close}`}
            aria-hidden="true">
          </i>
        </If>
        <If condition={subscribed}>
          <h4 className="text-right">Thank you for joining!</h4>
        </If>
        <If condition={!subscribed}>
          <Form className={styles.newsletterForm} inline onSubmit={handleSubmit(subscribeUserAction)}>
            <FormGroup controlId="name" type="text" field={name} inline>
              <UserInput placeholder="Enter name" field={name} />
            </FormGroup>
            <FormGroup controlId="email" type="text" field={email} inline>
              <EmailInput email={email} />
            </FormGroup>
            <LoadingButton
              className={styles.button}
              type="submit"
              submitting={submitting}
              bsSize="medium"
              bsStyle="primary"
            >Join our newsletter</LoadingButton>
            <ErrorBlock error={formError}/>
          </Form>
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
