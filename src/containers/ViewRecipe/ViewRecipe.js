import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';

const ViewRecipeRecipeDetailsComponent = connect((store) => {
  return {
    recipe: store.viewRecipe.entity
  };
})(RecipeDetails);


@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch( requestGet(params.recipe));
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
