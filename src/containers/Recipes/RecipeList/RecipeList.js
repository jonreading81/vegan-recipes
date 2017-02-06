import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsGrid, SearchWell, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import RecipeHelper from 'helpers/Recipe';
import { request as requestList} from 'redux/modules/recipes/list';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {HeroPanel} from 'components';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';

@connect(
  (state) => {
    return {
      results: get(state.recipeList, 'items'),
      searching: get(state.recipeList, 'isFetching'),
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
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
@asyncConnect([
  {
    promise: ({params, store: {dispatch}}) => {
      return dispatch(requestList(params.term, params.page));
    }
  },
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('recipes'));
    }
  },
])
export default class RecipeListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    searching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getRecipes: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  }

  getRecipes(page) {
    const term = get(this.props.params, 'term', '');
    this.props.getRecipes(term, page);
  }

  searchRecipes(term) {
    this.props.getRecipes(term, 1);
  }


  render() {
    const {results, searching, page, isFetching} = this.props;
    const recipes = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const recipeItems = RecipeHelper.mapToItems(recipes);
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    return (
      <div>
        <Helmet title="Recipes"
          meta={[
            {name: 'description', content: 'List of delicious recipes'},
            {name: 'keywords', content: 'vegan, recipes'}
          ]}/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={page.getImage()} title={page.getTitle()}>
               {subTextComponent}
            </HeroPanel>
          </If>
         <div className="container">
          <SearchWell searching={searching} onSubmit={::this.searchRecipes} />
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
