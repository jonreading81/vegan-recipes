import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList} from 'components';
import {Pagination} from 'react-bootstrap';
import RecipeHelper from 'helpers/Recipe';
import { request as requestList} from 'redux/modules/recipes/list';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';

@connect(
  (state) => {
    return {
      results: get(state.recipeList, 'items'),
    };
  },
  (dispatch) => {
    return {
      paginate: (page) => {
        dispatch(push('/recipe/list/' + page));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestList('all', params.page));
  }
}])
export default class RecipeListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    paginate: PropTypes.func.isRequired
  }

  getRecipes(page) {
    this.props.paginate(page);
  }

  render() {
    const {results} = this.props;
    const recipes = get(results, 'docs', []);
    const pages = get(results, 'pages', 1);
    const activePage = parseInt( get(results, 'page', 1), 10);
    const recipeItems = RecipeHelper.mapToItems(recipes);
    return (
      <div>
        <Helmet title="Recipes"/>
        <div className="container">
          <h1>Recipes</h1>
          <ItemsList items={recipeItems}/>
          <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={this.getRecipes.bind(this)} />
         </div>
      </div>
    );
  }
}
