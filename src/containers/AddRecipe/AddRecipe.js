import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeForm} from 'components';
import { requestAddRecipe} from 'redux/modules/addRecipe';


const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: bindActionCreators(requestAddRecipe, dispatch)
  };
};

const AddRecipeComponent = connect(null, mapDispatchToProps)(RecipeForm);

export default class RecipeListContainer extends Component {

  render() {
    return (
      <div>
        <Helmet title="Add Recipes"/>
        <div className="container">
          <h1>Add Recipes</h1>
          <AddRecipeComponent />
         </div>
      </div>
    );
  }
}
