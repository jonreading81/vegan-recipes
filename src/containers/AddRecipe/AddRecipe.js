import React, { Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeForm} from 'components';
import {requestAddRecipe} from 'redux/modules/addRecipe';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import ErrorModal from 'components/Form/ErrorModal';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import {batchActions} from 'redux-batched-actions';
import {reset as resetForm} from 'redux-form';
import {push } from 'react-router-redux';
import get from 'lodash/get';

const AddRecipeComponent = connect(
  null, (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAddRecipe, dispatch)
    };
  }
)(RecipeForm);


const SuccessConfirmationModal = connect(
  (state) => {
    return {
      show: state.addRecipe.recipeAdded ? true : false,
      title: 'Recipe Added'
    };
  },
  (dispatch, params) => {
    console.log(params);
    return {
      close: () => {
        dispatch(batchActions([resetForm('recipeForm'), resetAddRecipe()]));
      },
      confirm: () => {
        dispatch(batchActions([
          resetForm('recipeForm'),
          resetAddRecipe()
        ]));
        dispatch(push('/recipes/' + get(params, 'recipe')));
      },
    };
  }
)(ConfirmationModal);

const ValidationErrorModal = connect(
  (state) => {
    return {
      show: state.addRecipe.error ? true : false,
      errors: state.addRecipe.error ? state.addRecipe.error.errors : []
    };
  },
  (dispatch) => {
    return {
      close: bindActionCreators(resetAddRecipe, dispatch)
    };
  }
)(ErrorModal);

@connect((state) => {
  return {
    recipeAdded: state.addRecipe.recipeAdded,
    error: state.addRecipe.error
  };
})
export default class AddRecipeContainer extends Component {

  static propTypes ={
    recipeAdded: PropTypes.object,
    error: PropTypes.object,
  }
  render() {
    const {recipeAdded} = this.props;

    return (
      <div>
        <Helmet title="Add Recipes"/>
        <div className="container">
          <h1>Add Recipes</h1>
          <AddRecipeComponent />
          <ValidationErrorModal title="Validation Error">
            <p>The server returned an error while saving the document</p>
          </ValidationErrorModal>
          <SuccessConfirmationModal recipe={get(recipeAdded, 'slug')} title="Recipe Added" >
              <p>The Recipe was added successfully click OK to view the recipe</p>
          </SuccessConfirmationModal>
         </div>
      </div>
    );
  }
}
