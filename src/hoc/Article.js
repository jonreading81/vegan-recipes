/* eslint-disable padded-blocks */
import React, { PropTypes, Component } from 'react';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/wordpress/post';
import get from 'lodash/get';
import Article from 'helpers/Article';

export default function(ComposedComponent) {
  @connect(
    (store) => {
      return {
        articleHelper: new Article(get(store.viewPost, 'entity.docs[0]')),
        isFetching: get(store.viewPost, 'isFetching')
      };
    }
  )
  @asyncConnect([{
    promise: ({params, store: {dispatch}}) => {
      return dispatch( requestGet(params.article));
    }
  }])
  class ArticleContainer extends Component {
    static propTypes = {
      articleHelper: PropTypes.object.isRequired,
      isFetching: PropTypes.bool,
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }
  return ArticleContainer;
}
