import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsGrid, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import { request as requestList} from 'redux/modules/wordpress/articles';
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
      results: get(state.articlesList, 'items', []),
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
    };
  },
  (dispatch) => {
    return {
      getArticles: (page) => {
        dispatch(push('/jon-reading/list/' + page));
      }
    };
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('jon-reading'));
    }
  },
  {
    promise: ({params, store: {dispatch}}) => {
      return dispatch(requestList('jon-reading', params.page));
    }
  }
])
export default class JonProfile extends Component {

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
    const articleItems = ArticleHelper.mapToItems(articles);
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    const contentComponent = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');

    console.log(page);
    console.log('Jon Reading Profile');
    return (
      <div>
        <Helmet title="Jon Reading Profile"
          meta={[
            {name: 'description', content: 'Jon Readings Yoga Teacher Profile'},
            {name: 'keywords', content: 'yoga, hatha'}
          ]}/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={page.getImage()} title="Jon Reading Profile">
               {subTextComponent}
            </HeroPanel>
             <div className="container">
              <div className="body-copy">{contentComponent}</div>
            </div>
          </If>
         <div className="container ">
          <div className="column-large">
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If >
            <ItemsGrid items={articleItems}/>
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}
