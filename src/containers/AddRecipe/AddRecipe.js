import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import RecipeForm from './RecipeForm';
import ErrorModal from './ErrorModal';
import ConfirmationModal from './ConfirmationModal';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import { bindActionCreators } from 'redux';
import {reset as resetForm} from 'redux-form';

@connect(
  (state) => {
    return {
      recipe: state.addRecipe.recipe
    };
  },
  (dispatch) => {
    return {
      resetAction: bindActionCreators(resetAddRecipe, dispatch),
    };
  }
)
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
    resetAction: PropTypes.func
  }

  componentWillUnmount() {
    this.props.resetAction();
    resetForm('recipeForm');
  }

  render() {
    return (
      <div>
        <Helmet title="Add Recipes"/>
        <div className="container">
          <h1>Add Recipes</h1>
          <RecipeForm />
          <ErrorModal title="Validation Error">
            <p>The server returned an error while saving the document</p>
          </ErrorModal>
          <ConfirmationModal title="Recipe Added" >
              <p>The Recipe was added successfully click OK to view the recipe</p>
          </ConfirmationModal>
         </div>
      </div>
    );
  }
}
