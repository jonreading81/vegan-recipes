import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EntityFormContainer} from 'components';
import {reset as resetForm} from 'redux-form';
import RecipeHelper from 'helpers/Recipe';
import {request as requestUpdateRecipe, reset as resetUpdateRecipe} from 'redux/modules/recipes/update';
import {request as requestGet} from 'redux/modules/recipes/view';
import {RecipeForm} from 'components';
const resetFormAction = resetForm('recipeForm');

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
    return dispatch(requestGet(params.recipe));
  }
}])
export default class UpdateRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
    isSuccess: PropTypes.bool,
    error: PropTypes.object,
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
