import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList} from 'components';
import {Pagination, FormGroup, FormControl, Button} from 'react-bootstrap';
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

  searchRecipes(event) {
    event.preventDefault();
    const term = get(this.state, 'searchTerm', 'all');
    this.props.getRecipes(term, 1);
  }

  handleSearchChange(event) {
    this.setState({searchTerm: event.target.value});
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
        <div className="container">
          <h1>Recipes</h1>
          <form onSubmit={::this.searchRecipes}>
            <FormGroup>
            <FormControl ref="search" type="text" placeholder="Search" onChange={::this.handleSearchChange} />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </form>
          <ItemsList items={recipeItems}/>
          <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getRecipes} />
         </div>
      </div>
    );
  }
}
