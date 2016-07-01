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
export default class AddEntityComponent extends Component {

  static propTypes ={
    entity: PropTypes.object,
    children: PropTypes.object,
    resetState: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    resetStateAction: PropTypes.func.isRequired,
    resetFormAction: PropTypes.func.isRequired,
    getEntityURL: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
    entityName: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  componentWillUnmount() {
    const {resetState, resetForm} = this.props;
    resetState();
    resetForm();
  }

  getSuccessModal() {
    const {resetFormAction, resetStateAction, getEntityURL } = this.props;

    return connect(
      null,
      (dispatch) => {
        return {
          close: () => {
            dispatch(batchActions([
              resetFormAction,
              resetStateAction
            ]));
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
            dispatchProps.confirm(stateProps.entity);
          }
        };
      }
    )(ConfirmationModal);
  }

  render() {
    const {pageTitle, entityName, children, isSuccess, entity, isError, resetState} = this.props;
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
          <SuccessModal entity={entity} show={isSuccess} title={entityName + 'Added'} >
              <p>The {entityName} was added successfully click OK to view the recipe</p>
          </SuccessModal>
         </div>
      </div>
    );
  }

}
