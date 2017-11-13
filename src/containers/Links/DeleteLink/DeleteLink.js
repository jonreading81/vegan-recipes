import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/links/view';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import {request as requestDelete, reset as resetDelete} from 'redux/modules/links/delete';
import {HeroPanel, Loading, DeleteEntity, BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import get from 'lodash/get';
import { LinkContainer } from 'react-router-bootstrap';
import ViewHelper from 'helpers/Link';

@connect(
  (state) => {
    return {
      entity: get(state.viewLink, 'entity', {}),
      isFetching: state.viewLink.isFetching,
      submitting: get(state.deleteLink, 'isFetching', false),
      isSuccess: state.deleteLink.isSuccess,
      error: state.deleteLink.error
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
              <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to={myViewHelper.getUpdateURL()}>
              <Breadcrumb.Item>{myViewHelper.getTitle()}</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Delete</Breadcrumb.Item>
          </BreadcrumbContainer>
          <HeroPanel type="post-heading" hasBreadcrumb image={myViewHelper.getImage()} title={myViewHelper.getTitle()} />
          <DeleteEntity
            deleteEntity={deleteEntity}
            resetStateAction={resetDelete()}
            pageTitle="Delete Link"
            submitting={submitting}
            isSuccess = {isSuccess}
            isError = {error ? true : false}
            successMessage = "The Link was deleted successfully"
            successTitle = "Link Deleted"
            successURL="/link/list/all"
            >
            <p>Are you sure you would like to delete the following Link?</p>
            <p>{myViewHelper.getTitle()}</p>
          </DeleteEntity>
        </If>
      </div>
    );
  }
}
