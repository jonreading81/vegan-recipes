import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsGrid, SearchWell, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import viewHelper from 'helpers/Link';
import { request as requestList} from 'redux/modules/links/list';
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
      results: get(state.linkList, 'items'),
      searching: get(state.linkList, 'isFetching'),
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
    };
  },
  (dispatch) => {
    return {
      getInspiration: (term, page) => {
        dispatch(push('/link/list/' + term + '/' + page));
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
      return dispatch(requestPage('links'));
    }
  },
])
export default class LinkListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    searching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getInspiration: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  }

  getPage(page) {
    const term = get(this.props.params, 'term', '');
    this.props.getInspiration(term, page);
  }

  search(term) {
    this.props.getInspiration(term, 1);
  }


  render() {
    const {results, searching, page, isFetching} = this.props;
    const docs = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const items = viewHelper.mapToItems(docs);
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    return (
      <div>
        <Helmet title="Links"/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={page.getImage()} title={page.getTitle()}>
               {subTextComponent}
            </HeroPanel>
          </If>
         <div className="container">
          <SearchWell searching={searching} onSubmit={::this.search} />
          <If condition={ items.length === 0 }>
            <h4>No Links</h4>
          </If >
          <ItemsGrid hasAdminActions items={items}/>
          <If condition={ pages > 1 }>
             <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getPage} />
          </If>
         </div>
      </div>
    );
  }
}
