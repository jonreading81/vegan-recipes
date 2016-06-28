import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {requestGetRecipe} from 'redux/modules/viewRecipe';
import { asyncConnect } from 'redux-async-connect';

const ViewRecipeRecipeDetailsComponent = connect((store) => {
  return {
    recipe: store.viewRecipe.recipe
  };
})(RecipeDetails);


@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGetRecipe(params.recipe));
  }
}])
export default class ViewRecipeContainer extends Component {

  static propTypes = {
    params: PropTypes.object
  };

  render() {
    return (
      <div>
        <Helmet title="View Recipes"/>
        <div className="container">
          <ViewRecipeRecipeDetailsComponent />
         </div>
      </div>
    );
  }
}
