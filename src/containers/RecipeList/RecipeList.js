import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsGrid, SearchWell} from 'components';
import {Pagination} from 'react-bootstrap';
import RecipeHelper from 'helpers/Recipe';
import { request as requestList} from 'redux/modules/recipes/list';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {HeroPanel} from 'components';

@connect(
  (state) => {
    return {
      results: get(state.recipeList, 'items'),
    };
  },
  (dispatch) => {
    return {
      getRecipes: (term, page) => {
        dispatch(push('/recipe/list/' + term + '/' + page));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestList(params.term, params.page));
  }
}])
export default class RecipeListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getRecipes: PropTypes.func.isRequired
  }

  getRecipes(page) {
    const term = get(this.props.params, 'term', '');
    this.props.getRecipes(term, page);
  }

  searchRecipes(term) {
    this.props.getRecipes(term, 1);
  }


  render() {
    const {results} = this.props;
    const recipes = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const recipeItems = RecipeHelper.mapToItems(recipes);
    return (
      <div>
        <Helmet title="Recipes"/>
        <HeroPanel image="chocolate-brownie.jpeg" title="Recipes" subTitle="Delecious Recipes"/>
        <div className="container">
          <SearchWell onSubmit={::this.searchRecipes} />
          <If condition={ recipes.length === 0 }>
            <h4>No Recipes</h4>
          </If >
          <ItemsGrid items={recipeItems}/>
          <If condition={ pages > 1 }>
             <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getRecipes} />
          </If>
         </div>
      </div>
    );
  }
}
