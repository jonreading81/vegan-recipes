import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/inspiration/view';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import {request as requestDelete, reset as resetDelete} from 'redux/modules/inspiration/delete';
import {HeroPanel, Loading, DeleteEntity, BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import get from 'lodash/get';
import { LinkContainer } from 'react-router-bootstrap';
import ViewHelper from 'helpers/Inspiration';

@connect(
  (state) => {
    return {
      entity: get(state.viewInspiration, 'entity', {}),
      isFetching: state.viewInspiration.isFetching,
      submitting: get(state.deleteInspiration, 'isFetching', false),
      isSuccess: state.deleteInspiration.isSuccess,
      error: state.deleteInspiration.error
    };
  },
  (dispatch) => {
    return {
      deleteEntity: bindActionCreators(requestDelete, dispatch),
    };
  },
  (stateProps, dispatchProps, componentProps) => {
    return {
      ...componentProps,
      ...stateProps,
      ...dispatchProps,
      deleteEntity: () => {
        dispatchProps.deleteEntity(get(stateProps.entity, '_id'));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGet(params.entity));
  }
}])
export default class DeleteInspirationContainer extends Component {

  static propTypes = {
    entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.bool,
    isSuccess: PropTypes.bool
  };

  render() {
    const {
      entity,
      deleteEntity,
      submitting,
      isFetching,
      isSuccess,
      error
    } = this.props;
    const myViewHelper = new ViewHelper(entity);

    return (
      <div>
        <If condition={isFetching}>
          <Loading />
        </If>
          <If condition={!isFetching}>
          <BreadcrumbContainer>
            <LinkContainer to="/link/list/all">
              <Breadcrumb.Item>Link</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Delete</Breadcrumb.Item>
          </BreadcrumbContainer>
          <HeroPanel type="post-heading" hasFixedBreadcrumb image={myViewHelper.getImage()} title={myViewHelper.getTitle()} subTitle={'by ' + myViewHelper.getAuthor()}/>
          <DeleteEntity
            deleteEntity={deleteEntity}
            resetStateAction={resetDelete()}
            pageTitle="Delete Inspiration"
            submitting={submitting}
            isSuccess = {isSuccess}
            isError = {error ? true : false}
            successMessage = "The Inspiration was deleted successfully"
            successTitle = "Inspiration Deleted"
            successURL="/inspiration/list/all"
            >
            <p>Are you sure you would like to delete the following Inspiration?</p>
            <p>{myViewHelper.getTitle()}</p>
          </DeleteEntity>
        </If>
      </div>
    );
  }
}
