import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reset as resetForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import { request as requestAdd, reset as resetAdd} from 'redux/modules/inspiration/add';
import {RecipeForm} from 'components';
import {HeroPanel, EntityFormContainer} from 'components';
const resetFormAction = resetForm('recipeForm');
const resetStateAction = resetAdd();
import ViewHelper from 'helpers/Inspiration';
import UserHelper from 'helpers/User';
import get from 'lodash/get';

@connect(
  (state) => {
    return {
      entity: state.addInspiration.entity,
      isSuccess: state.addInspiration.isSuccess,
      submitting: state.addInspiration.isFetching,
      error: state.addInspiration.error,
      user: get(state.auth, 'user')
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAdd, dispatch)
    };
  }
)
export default class AddRecipeContainer extends Component {

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
        pageTitle = "New Inspiration"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction, resetFormAction]}
        getEntityURL = {ViewHelper.getURLWithRecipeData}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Inspiration was added successfully click OK to view the Inspiration"
        successTitle = "Inspiration Added"
        >
        <RecipeForm onSubmit={onSubmit} initialValues={initialValues} loading={submitting} />
        </EntityFormContainer>
      </div>
    );
  }
}
