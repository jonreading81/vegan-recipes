import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reset as resetForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import { request as requestAdd, reset as resetAdd} from 'redux/modules/links/add';
import {LinkForm} from 'components';
import {HeroPanel, EntityFormContainer} from 'components';
const resetFormAction = resetForm('linkForm');
const resetStateAction = resetAdd();
import ViewHelper from 'helpers/Link';
import UserHelper from 'helpers/User';
import get from 'lodash/get';

@connect(
  (state) => {
    return {
      entity: state.addLink.entity,
      isSuccess: state.addLink.isSuccess,
      submitting: state.addLink.isFetching,
      error: state.addLink.error,
      user: get(state.auth, 'user')
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAdd, dispatch)
    };
  }
)
export default class AddLinkContainer extends Component {

  static propTypes ={
    entity: PropTypes.object,
    isSuccess: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
  }

  render() {
    const {entity, isSuccess, error, onSubmit, user, submitting} = this.props;
    const author = new UserHelper(user);
    const initialValues = {
      author: author.getFullName()
    };
    return (
      <div>
        <HeroPanel isEmpty image="forest.jpeg" />
       <EntityFormContainer
        entity ={entity}
        pageTitle = "New Link"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction, resetFormAction]}
        getEntityURL = {ViewHelper.getUpdateURLWithData}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Link was added successfully click OK to view the Inspiration"
        successTitle = "Link Added"
        >
        <h2>Link Details</h2>
        <LinkForm onSubmit={onSubmit} initialValues={initialValues} loading={submitting} />
        </EntityFormContainer>
      </div>
    );
  }
}
