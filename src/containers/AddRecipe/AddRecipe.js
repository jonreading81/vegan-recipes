import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import EntityFormContainer from 'components';
import {reset as resetForm} from 'redux-form';
import {getURL as getRecipeURL} from 'utils/recipes';
import { bindActionCreators } from 'redux';
import {requestAddRecipe} from 'redux/modules/addRecipe';
import {RecipeForm} from 'components';
const resetFormAction = resetForm('recipeForm');
const resetStateAction = resetAddRecipe();


@connect(
  (state) => {
    return {
      recipe: state.addRecipe.recipe,
      isSuccess: state.addRecipe.isSuccess,
      error: state.addRecipe.error
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
    error: PropTypes.object,
    onSubmit: PropTypes.func
  }

  render() {
    const {recipe, isSuccess, error, onSubmit} = this.props;
    return (
      <div>
       <EntityFormContainer
        entity ={recipe}
        pageTitle = "Add Recipe"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction, resetFormAction]}
        getEntityURL = {getRecipeURL}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Recipe was added successfully click OK to view the recipe"
        successTitle = "Recipe Added"
        >
        <RecipeForm onSubmit={onSubmit} />
        </EntityFormContainer>
      </div>
    );
  }
}
