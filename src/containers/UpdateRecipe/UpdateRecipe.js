import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import RecipeForm from './RecipeForm';
import ErrorModal from './ErrorModal';
import ConfirmationModal from './ConfirmationModal';
import {requestGetRecipe} from 'redux/modules/viewRecipe';
import { asyncConnect } from 'redux-async-connect';
import {resetUpdateRecipe} from 'redux/modules/updateRecipe';
import { bindActionCreators } from 'redux';
import {reset as resetForm} from 'redux-form';

@connect(
  (state) => {
    return {
      recipe: state.updateRecipe.recipe
    };
  },
  (dispatch) => {
    return {
      resetAction: bindActionCreators(resetUpdateRecipe, dispatch),
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGetRecipe(params.recipe));
  }
}])
export default class UpdateRecipeContainer extends Component {

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
        <Helmet title="Update Recipe"/>
        <div className="container">
          <h1>Update Recipe</h1>
          <RecipeForm />
          <ErrorModal title="Validation Error">
            <p>The server returned an error while saving the document</p>
          </ErrorModal>
          <ConfirmationModal title="Recipe Updated" >
            <p>The Recipe was updated successfully click OK to view the recipe</p>
          </ConfirmationModal>
         </div>
      </div>
    );
  }
}
