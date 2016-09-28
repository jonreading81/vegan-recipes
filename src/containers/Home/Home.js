import React, { PropTypes, Component } from 'react';
import config from '../../config';
import {Article as ArticleComponent} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/articles/view';
import get from 'lodash/get';
import Article from 'helpers/Article';

@connect(
  (store) => {
    return {
      article: new Article(get(store.viewArticle, 'entity.docs[0]')),
      isFetching: get(store.viewRecipe, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch( requestGet('article-1'));
  }
}])
export default class Home extends Component {

  static propTypes = {
    article: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {article, isFetching} = this.props;
    return (
      <ArticleComponent article={article} isFetching={isFetching} heroStyle="image-focus-bottom">
        <audio controls>
          <source src={config.app.birdsong} type="audio/mp3" />
        </audio>
      </ArticleComponent>
    );
  }
}
