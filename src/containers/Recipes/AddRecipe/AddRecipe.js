import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reset as resetForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import { request as requestAddRecipe, reset as resetAddRecipe} from 'redux/modules/recipes/add';
import {RecipeForm} from 'components';
import {HeroPanel, EntityFormContainer} from 'components';
const resetFormAction = resetForm('recipeForm');
const resetStateAction = resetAddRecipe();
import RecipeHelper from 'helpers/Recipe';
import UserHelper from 'helpers/User';
import get from 'lodash/get';

@connect(
  (state) => {
    return {
      recipe: state.addRecipe.entity,
      isSuccess: state.addRecipe.isSuccess,
      submitting: state.addRecipe.isFetching,
      error: state.addRecipe.error,
      user: get(state.auth, 'user')
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAddRecipe, dispatch)
    };
  }
)
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
    isSuccess: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
  }

  render() {
    const {recipe, isSuccess, error, onSubmit, user, submitting} = this.props;
    const author = new UserHelper(user);
    const initialValues = {
      author: author.getFullName()
    };

    return (
      <div>
       <HeroPanel isEmpty image="forest.jpeg" />
       <EntityFormContainer
        entity ={recipe}
        pageTitle = "New Recipe"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction, resetFormAction]}
        getEntityURL = {RecipeHelper.getURLWithRecipeData}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Recipe was added successfully click OK to view the recipe"
        successTitle = "Recipe Added"
        >
        <RecipeForm onSubmit={onSubmit} initialValues={initialValues} loading={submitting} />
        </EntityFormContainer>
      </div>
    );
  }
}
