import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import StatusModal from 'components/Form/StatusModal';
import {push } from 'react-router-redux';
import {batchActions} from 'redux-batched-actions';

@connect(
  null,
  (dispatch, props) => {
    return {
      resetState: () => dispatch(props.resetStateAction),
      resetForm: () => dispatch(props.resetFormAction),
    };
  }
)
export default class EntityFormContainer extends Component {

  static propTypes ={
    entity: PropTypes.object,
    children: PropTypes.object,
    resetState: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    resetStateAction: PropTypes.object.isRequired,
    resetFormAction: PropTypes.object.isRequired,
    onSuccessCancelActions: PropTypes.array.isRequired,
    getEntityURL: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    successTitle: PropTypes.string,
  }

  componentWillUnmount() {
    const {resetState, resetForm} = this.props;
    resetState();
    resetForm();
  }

  getSuccessModal() {
    const {onSuccessCancelActions, getEntityURL } = this.props;

    return connect(
      null,
      (dispatch) => {
        return {
          close: () => {
            dispatch(batchActions(onSuccessCancelActions));
          },
          confirm: (entity) => {
            dispatch(push(getEntityURL(entity)));
          },
        };
      },
      (stateProps, dispatchProps, componentProps) => {
        return {
          ...componentProps,
          ...stateProps,
          ...dispatchProps,
          confirm: () => {
            dispatchProps.confirm(componentProps.entity);
          }
        };
      }
    )(ConfirmationModal);
  }

  render() {
    const {pageTitle, children, isSuccess, entity, isError, resetState, successMessage, successTitle} = this.props;
    const SuccessModal = this.getSuccessModal();
    return (
      <div>
        <Helmet title={pageTitle}/>
        <div className="container">
          <h1>{pageTitle}</h1>
          {children}
          <StatusModal show={isError} title="Validation Error" close={resetState}>
            <p>The server returned an error while saving the document</p>
          </StatusModal>
          <SuccessModal entity={entity} show={isSuccess} title={successTitle} >
              <p>{successMessage}</p>
          </SuccessModal>
         </div>
      </div>
    );
  }

}
