/* eslint-disable padded-blocks */
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import ArticleHelper from 'helpers/Article';
import { request as requestList} from 'redux/modules/wordpress/articles';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);

export default function(ComposedComponent, {searchURL, slug, tagId, articleURL}) {
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
          dispatch(push(searchURL + term + '/' + page));
        }
      };
    }
  )
  @asyncConnect([
    {
      promise: ({store: {dispatch}}) => {
        return dispatch(requestPage(slug));
      }
    },
    {
      promise: ({params: {term = 'all', page}, store: {dispatch}}) => {
        return dispatch(requestList([tagId, term], page));
      }
    }
  ])
  class ArticleListContainer extends Component {

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
      const {results, page} = this.props;

      const articles = get(results, 'docs', []);
      const pages = get(results, 'pages', 0);
      const activePage = parseInt( get(results, 'page', 0), 10);
      const articleItems = ArticleHelper.mapToItems(articles, { baseURL: articleURL });
      const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
      const sidePanelComponent = htmlToReactParser.parse('<div>' + page.getSidePanel() + '</div>');
      const contentComponent = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');

      const props = {
        ...this.props,
        getArticles: this.getArticles.bind(this),
        searchArticles: this.searchArticles.bind(this),
        subTextComponent,
        articleItems,
        contentComponent,
        sidePanelComponent,
        activePage,
        articles,
        pages,
      };
      return (<ComposedComponent {...props} />);
    }
  }

  return ArticleListContainer;
}
