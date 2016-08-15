import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';
import {HeroPanel} from 'components';
import RecipeHelper from 'helpers/Recipe';

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
    const myRecipeHelper = new RecipeHelper(recipe);
    let content;

    if (recipe) {
      content = (
        <div>
          <Helmet title="View Recipes"/>
           <HeroPanel type="post-heading" image={myRecipeHelper.getImage()} title={myRecipeHelper.getTitle()} subTitle={myRecipeHelper.getShortDescription() + ', by ' + myRecipeHelper.getAuthor()}/>
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
