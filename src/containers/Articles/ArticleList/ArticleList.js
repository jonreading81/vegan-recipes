import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList, SearchWell, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import ArticleHelper from 'helpers/Article';
import { request as requestList} from 'redux/modules/wordpress/articles';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {HeroPanel} from 'components';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
const articleURL = '/article/';

@connect(
  (state) => {
    return {
      results: get(state.articlesList, 'items', []),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
      isFetching: get(state.viewPage, 'isFetching'),
      searching: get(state.articlesList, 'isFetching'),
    };
  },
  (dispatch) => {
    return {
      getArticles: (term, page) => {
        dispatch(push('/article/list/' + term + '/' + page));
      }
    };
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('articles'));
    }
  },
  {
    promise: ({params, store: {dispatch}}) => {
      return dispatch(requestList([2, params.term], params.page));
    }
  }
])
export default class ArticleListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    searching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getArticles: PropTypes.func.isRequired
  }

  getArticles(page) {
    const term = get(this.props.params, 'term', '');
    this.props.getArticles(term, page);
  }

  searchArticles(term) {
    this.props.getArticles(term, 1);
  }


  render() {
    const {results, searching, page, isFetching} = this.props;
    const articles = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const articleItems = ArticleHelper.mapToItems(articles, { baseURL: articleURL });
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    return (
      <div>
        <Helmet title={page.getTitle()}/>
          <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={page.getImage()} title={page.getTitle()} heroStyle="image-focus-bottom">
               {subTextComponent}
            </HeroPanel>
          </If>
        <div className="container ">
          <div className="column-large">
            <SearchWell searching={searching} onSubmit={::this.searchArticles} />
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If >
            <ItemsList items={articleItems}/>
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}
