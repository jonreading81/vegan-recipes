import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EntityFormContainer, HeroPanel, Loading, LinkForm, BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import {reset as resetForm} from 'redux-form';
import ViewHelper from 'helpers/link';
import {request as requestUpdate, reset as resetUpdate} from 'redux/modules/links/update';
import {request as requestGet} from 'redux/modules/links/view';
const resetFormAction = resetForm('linkForm');
const resetStateAction = resetUpdate();
import get from 'lodash/get';
import { asyncConnect } from 'redux-async-connect';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (state) => {
    return {
      entity: state.viewLink.entity,
      isFetching: state.viewLink.isFetching,
      submitting: state.updateLink.isFetching,
      isSuccess: state.updateLink.isSuccess,
      error: state.updateLink.error
    };
  },
  (dispatch) => {
    return {
      onSubmit: (id, data) => {
        dispatch(requestUpdate(id, data));
      }
    };
  },
  (stateProps, dispatchProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      onSubmit: (data) => {
        dispatchProps.onSubmit(get(stateProps.entity, '_id'), data);
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(requestGet(params.entity)));
    return Promise.all(promises);
  }
}])

export default class UpdateLinkContainer extends Component {

  static propTypes ={
    entity: PropTypes.object,
    isSuccess: PropTypes.bool,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.any,
    onSubmit: PropTypes.func
  }

  render() {
    const {entity, isSuccess, error, onSubmit, isFetching, submitting} = this.props;
    const myViewHelper = new ViewHelper(entity);
    return (
      <div>
       <If condition={isFetching}>
          <Loading />
      </If>
      <If condition={!isFetching}>
        <BreadcrumbContainer>
          <LinkContainer to="/links/list/all">
          <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={myViewHelper.getURL()}>
          <Breadcrumb.Item>{myViewHelper.getTitle()}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Update</Breadcrumb.Item>
        </BreadcrumbContainer>
         <HeroPanel type="post-heading" hasBreadcrumb image={myViewHelper.getImage()} title={myViewHelper.getTitle()}/>
         <EntityFormContainer
          entity ={entity}
          pageTitle = "Update Inspiration"
          resetStateAction = {resetStateAction}
          resetFormAction = {resetFormAction}
          onSuccessCancelActions = {[resetStateAction]}
          getEntityURL = {ViewHelper.getUpdateURLWithData}
          isSuccess = {isSuccess}
          isError = {error ? true : false}
          successMessage = "The Link was updated successfully click OK to view the Link"
          successTitle = "Link Updated"
          >
          <LinkForm onSubmit={onSubmit} initialValues={entity} loading={submitting} />
          </EntityFormContainer>
        </If>
      </div>
    );
  }
}
