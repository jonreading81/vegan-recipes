import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import RecipeForm from './RecipeForm';
import ErrorModal from './ErrorModal';
import ConfirmationModal from './ConfirmationModal';
import {requestGetRecipe} from 'redux/modules/viewRecipe';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';

@connect((state) => {
  return {
    recipe: state.viewRecipe.recipe
  };
})
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGetRecipe(params.recipe));
  }
}])
export default class UpdateRecipeContainer extends Component {

  static propTypes ={
    recipe: PropTypes.object
  }

  render() {
    const {recipe} = this.props;

    return (
      <div>
        <Helmet title="Update Recipe"/>
        <div className="container">
          <h1>Update Recipe</h1>
          <RecipeForm recipe={get(recipe, '_id')}/>
          <ErrorModal title="Validation Error">
            <p>The server returned an error while saving the document</p>
          </ErrorModal>
          <ConfirmationModal recipe={get(recipe, 'slug')} title="Recipe Updated" >
              <p>The Recipe was updated successfully click OK to view the recipe</p>
          </ConfirmationModal>
         </div>
      </div>
    );
  }
}
