import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import AddEntity from 'components/AddEntity/AddEntity';
import RecipeForm from './RecipeForm';
import {reset as resetForm} from 'redux-form';
import {getURL as getRecipeURL} from 'utils/recipes';
import get from 'lodash/get';
import has from 'lodash/has';


@connect(
  (state) => {
    return {
      recipe: state.addRecipe.recipe
    };
  }
)
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
  }

  render() {
    const {recipe} = this.props;
    return (
      <div>
       <AddEntity
        entity ={recipe}
        entityName ="Recipe"
        pageTitle = "Add Recipes"
        resetStateAction = {resetAddRecipe()}
        resetFormAction = {resetForm('recipeForm')}
        getEntityURL = {getRecipeURL}
        isSuccess = {get(recipe, 'isSuccess', false)}
        isError = {has(recipe, 'error')}
        >
            <RecipeForm />
        </AddEntity>
      </div>
    );
  }
}
