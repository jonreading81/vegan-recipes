import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {goBack, push} from 'react-router-redux';
import StatusModal from 'components/Form/StatusModal';

@connect(
  null,
  (dispatch, componentProps) => {
    return {
      cancel: bindActionCreators(goBack, dispatch),
      resetState: () => {
        dispatch(componentProps.resetStateAction);
      },
      successRedirect: () => {
        dispatch(push(componentProps.successURL));
      }
    };
  }
)
export default class DeleteRecipeContainer extends Component {

  static propTypes = {
    children: PropTypes.array,
    deleteEntity: PropTypes.func,
    resetStateAction: PropTypes.object,
    pageTitle: PropTypes.string,
    cancel: PropTypes.func,
    resetState: PropTypes.func,
    submitting: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    successTitle: PropTypes.string,
    successURL: PropTypes.string,
    successRedirect: PropTypes.func,
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      cancel,
      submitting,
      children,
      pageTitle,
      successTitle,
      successMessage,
      deleteEntity,
      isSuccess,
      isError,
      successRedirect,
      resetState

    } = this.props;
    return (
      <div>
        <Helmet title={pageTitle}/>
        <div className="container">
          <h1>{pageTitle}</h1>
          {children}
          <ButtonToolbar>
            <Button disabled={submitting} onClick={deleteEntity} bsStyle="primary" bsSize="large" >Confirm</Button>
            <Button disabled={submitting} onClick={cancel} bsSize="large" >Cancel</Button>
          </ButtonToolbar>
           <StatusModal show={isSuccess} close={successRedirect} title={successTitle}>
            <p>{successMessage}</p>
          </StatusModal>
           <StatusModal show={isError} title="Deletion Failed" close={resetState}>
            <p>The server returned an error while deleting the document</p>
          </StatusModal>
       </div>
      </div>
    );
  }
}
