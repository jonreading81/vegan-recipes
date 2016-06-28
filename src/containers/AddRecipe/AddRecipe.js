import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import RecipeForm from './RecipeForm';
import ErrorModal from './ErrorModal';
import ConfirmationModal from './ConfirmationModal';
import get from 'lodash/get';

@connect((state) => {
  return {
    recipe: state.addRecipe.recipe
  };
})
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object
  }

  render() {
    const {recipe} = this.props;

    return (
      <div>
        <Helmet title="Add Recipes"/>
        <div className="container">
          <h1>Add Recipes</h1>
          <RecipeForm />
          <ErrorModal title="Validation Error">
            <p>The server returned an error while saving the document</p>
          </ErrorModal>
          <ConfirmationModal recipe={get(recipe, 'slug')} title="Recipe Added" >
              <p>The Recipe was added successfully click OK to view the recipe</p>
          </ConfirmationModal>
         </div>
      </div>
    );
  }
}
