import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';

@connect(
  (store) => {
    return {
      recipe: store.viewRecipe.entity
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch( requestGet(params.recipe));
  }
}])
export default class ViewRecipeContainer extends Component {

  static propTypes = {
    recipe: PropTypes.object
  };

  render() {
    const {recipe} = this.props;
    let content;

    console.log(recipe);

    if (recipe) {
      content = (
        <div>
          <Helmet title="View Recipes"/>
          <div className="container">
            <RecipeDetails recipe={recipe} />
           </div>
        </div>
      );
    }else {
      content = (
        <NotFound />
      );
    }

    return content;
  }
}
