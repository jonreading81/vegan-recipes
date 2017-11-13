import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EntityFormContainer, HeroPanel, Loading, InspirationForm, BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import {reset as resetForm} from 'redux-form';
import ViewHelper from 'helpers/Inspiration';
import {request as requestUpdate, reset as resetUpdate} from 'redux/modules/inspiration/update';
import {request as requestGet} from 'redux/modules/inspiration/view';
const resetFormAction = resetForm('inspirationForm');
const resetStateAction = resetUpdate();
import get from 'lodash/get';
import { asyncConnect } from 'redux-async-connect';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (state) => {
    return {
      entity: state.viewInspiration.entity.item,
      isFetching: state.viewInspiration.isFetching,
      submitting: state.updateInspiration.isFetching,
      isSuccess: state.updateInspiration.isSuccess,
      error: state.updateInspiration.error
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

export default class UpdateInspirationContainer extends Component {

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
          <LinkContainer to="/inspiration/list/all">
          <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={myViewHelper.getURL()}>
          <Breadcrumb.Item>{myViewHelper.getTitle()}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Update</Breadcrumb.Item>
        </BreadcrumbContainer>
         <HeroPanel type="post-heading" hasFixedBreadcrumb image={myViewHelper.getImage()} title={myViewHelper.getTitle()} subTitle={'by ' + myViewHelper.getAuthor()}/>
         <EntityFormContainer
          entity ={entity}
          pageTitle = "Update Inspiration"
          resetStateAction = {resetStateAction}
          resetFormAction = {resetFormAction}
          onSuccessCancelActions = {[resetStateAction]}
          getEntityURL = {ViewHelper.getURLWithData}
          isSuccess = {isSuccess}
          isError = {error ? true : false}
          successMessage = "The Inspiration was updated successfully click OK to view the Inspiration"
          successTitle = "Inspiration Updated"
          >
          <InspirationForm onSubmit={onSubmit} initialValues={entity} loading={submitting} />
          </EntityFormContainer>
        </If>
      </div>
    );
  }
}
