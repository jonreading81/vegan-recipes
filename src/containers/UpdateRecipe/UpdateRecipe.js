import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EntityFormContainer} from 'components';
import {reset as resetForm} from 'redux-form';
import RecipeHelper from 'helpers/Recipe';
import {request as requestUpdateRecipe, reset as resetUpdateRecipe} from 'redux/modules/recipes/update';
import {request as requestGet} from 'redux/modules/recipes/view';
import {RecipeForm} from 'components';
const resetFormAction = resetForm('recipeForm');
import { request as requestIngredients} from 'redux/modules/recipes/ingredients';
import { request as requestQuantities} from 'redux/modules/recipes/quantities';
import { request as requestCategories} from 'redux/modules/recipes/categories';
import { request as requestDiets} from 'redux/modules/recipes/diets';
const resetStateAction = resetUpdateRecipe();
import get from 'lodash/get';
import { asyncConnect } from 'redux-async-connect';

@connect(
  (state) => {
    return {
      recipe: state.viewRecipe.entity,
      isSuccess: state.updateRecipe.isSuccess,
      error: state.updateRecipe.error
    };
  },
  (dispatch) => {
    return {
      onSubmit: (id, data) => {
        dispatch(requestUpdateRecipe(id, data));
      }
    };
  },
  (stateProps, dispatchProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      onSubmit: (data) => {
        dispatchProps.onSubmit(get(stateProps.recipe, '_id'), data);
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(requestIngredients()));
    promises.push(dispatch(requestQuantities()));
    promises.push(dispatch(requestDiets()));
    promises.push(dispatch(requestCategories()));
    promises.push(dispatch(requestGet(params.recipe)));
    return Promise.all(promises);
  }
}])

export default class UpdateRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
    isSuccess: PropTypes.bool,
    error: PropTypes.any,
    onSubmit: PropTypes.func
  }

  render() {
    const {recipe, isSuccess, error, onSubmit} = this.props;
    return (
      <div>
       <EntityFormContainer
        entity ={recipe}
        pageTitle = "Update Recipe"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction]}
        getEntityURL = {RecipeHelper.getURLWithRecipeData}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Recipe was updated successfully click OK to view the recipe"
        successTitle = "Recipe Updated"
        >
        <RecipeForm onSubmit={onSubmit} initialValues={recipe} />
        </EntityFormContainer>
      </div>
    );
  }
}
