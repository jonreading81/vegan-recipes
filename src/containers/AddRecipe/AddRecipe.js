import React, { Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeForm} from 'components';
import {RecipeFormConfirmation} from 'components';
import { requestAddRecipe} from 'redux/modules/addRecipe';

const AddRecipeComponent = connect(
  null, (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAddRecipe, dispatch)
    };
  }
)(RecipeForm);

const ConfirmationOverlay = connect(
  (state) => {
    return {
      recipe: state.addRecipe.recipe,
      title: 'Recipe Added',
      message: 'success'
    };
  }
)(RecipeFormConfirmation);

@connect((state) => {
  return {
    recipe: state.addRecipe.recipe,
    error: state.addRecipe.error
  };
})
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object,
    error: PropTypes.object,
  }

  render() {
    const {
      recipe,
      error
    } = this.props;
    let dialogOverlay = '';

    if (recipe) {
      dialogOverlay = <ConfirmationOverlay />;
    }

    if (error) {
      dialogOverlay = <ConfirmationOverlay />;
    }

    return (
      <div>
        <Helmet title="Add Recipes"/>
        <div className="container">
          <h1>Add Recipes</h1>
          <AddRecipeComponent />
          {dialogOverlay}
         </div>
      </div>
    );
  }
}
