import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {ArticleList} from 'components';
import { request as requestList} from 'redux/modules/wordpress/articles';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {request as requestPage} from 'redux/modules/wordpress/page';
import ArticleHelper from 'helpers/Article';

@connect(
  (state) => {
    return {
      results: get(state.articlesList, 'items', []),
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
    };
  },
  (dispatch) => {
    return {
      getArticles: (page) => {
        dispatch(push('/aya/articles/list/' + page));
      }
    };
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('aya-articles'));
    }
  },
  {
    promise: ({params, store: {dispatch}}) => {
      return dispatch(requestList([5, ''], params.page));
    }
  }
])
export default class Aya extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getArticles: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  }

  getArticles(page) {
    this.props.getArticles(page);
  }

  render() {
    const {results, page, isFetching} = this.props;
    const articles = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    return (
      <ArticleList
          meta={[
            {name: 'description', content: 'Aya'},
            {name: 'keywords', content: 'aya'}
          ]}
          page={page}
          articlesTitle="Articles"
          articles={articles}
          pages={pages}
          activePage={activePage}
          isFetching={isFetching}
          getArticles={::this.getArticles}
      />
    );
  }
}
