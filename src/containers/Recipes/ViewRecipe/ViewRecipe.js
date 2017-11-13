import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';
import {HeroPanel, Loading} from 'components';
import RecipeHelper from 'helpers/Recipe';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (store) => {
    return {
      recipe: store.viewRecipe.entity,
      isFetching: store.viewRecipe.isFetching
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
    recipe: PropTypes.object,
    isFetching: PropTypes.bool,
  };

  render() {
    const {recipe, isFetching} = this.props;
    const myRecipeHelper = new RecipeHelper(recipe);
    let content;

    if (recipe) {
      content = (
        <div>
          <Helmet title = {myRecipeHelper.getTitle()}/>
          <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
          <BreadcrumbContainer>
            <LinkContainer to="/recipe/list/all">
              <Breadcrumb.Item>Recipes</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{myRecipeHelper.getTitle()}</Breadcrumb.Item>
          </BreadcrumbContainer>
           <HeroPanel type="post-heading"
             image={myRecipeHelper.getImage()}
             title={myRecipeHelper.getTitle()}
             subTitle={myRecipeHelper.getShortDescription() + ', by ' + myRecipeHelper.getAuthor()}
             hasBreadcrumb />
          <div className="container">
            <RecipeDetails recipe={recipe} />
           </div>
          </If>
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
