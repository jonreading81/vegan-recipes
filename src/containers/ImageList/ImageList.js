import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {connect} from 'react-redux';
import {ItemsGrid, SearchWell} from 'components';
import ImageHelper from 'helpers/Image';
import {Pagination} from 'react-bootstrap';
import { request as requestList} from 'redux/modules/images/list';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import {push } from 'react-router-redux';


@connect(
  (state) => {
    return {
      results: get(state.imageList, 'items', []),
      loading: get(state.imageList, 'isFetching'),
    };
  },
  (dispatch) => {
    return {
      getItems: (term, page) => {
        dispatch(push('/images/list/' + term + '/' + page));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestList(params.term, params.page));
  }
}])
export default class ImageList extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired
  }

  getItems(page) {
    const term = get(this.props.params, 'term', '');
    this.props.getItems(term, page);
  }

  searchItems(term) {
    this.props.getItems(term, 1);
  }

  render() {
    const {results, loading, } = this.props;
    const images = get(results, 'docs', []);
    const pages = get(results, 'pages', 0);
    const activePage = parseInt( get(results, 'page', 0), 10);
    const imageItems = ImageHelper.mapToItems(images);

    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Images"/>
        <HeroPanel image="forest.jpeg" title="Images" />
        <div className="container">
        <SearchWell searching={loading} onSubmit={::this.searchItems} />
          <If condition={ images.length === 0 }>
            <h4>No Images</h4>
          </If >
          <ItemsGrid items={imageItems}/>
           <If condition={ pages > 1 }>
             <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getItems} />
          </If>
         </div>
      </div>
    );
  }
}
