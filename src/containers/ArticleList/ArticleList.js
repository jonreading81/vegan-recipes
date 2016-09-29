import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList, SearchWell} from 'components';
import {Pagination} from 'react-bootstrap';
import ArticleHelper from 'helpers/Article';
import { request as requestList} from 'redux/modules/wordpress/articles';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';
import {HeroPanel} from 'components';

@connect(
  (state) => {
    return {
      results: get(state.articlesList, 'items'),
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
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestList(params.term, params.page));
  }
}])
export default class ArticleListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
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
    const {results, searching} = this.props;
    const articles = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const articleItems = ArticleHelper.mapToItems(articles);
    // const styles = require('./ArticleList.scss');
    return (
      <div>
        <Helmet title="Articles"/>
        <HeroPanel image="lentil-kale-quinoa-stew.jpeg" title="Articles" subTitle="A selection of articles"/>
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
