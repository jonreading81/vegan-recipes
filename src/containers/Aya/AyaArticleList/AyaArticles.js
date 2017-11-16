import React, { Component } from 'react';
import {ArticleList} from 'components';
import articleListHoc from 'hoc/ArticleList';
import heroStyles from '../heroPanel.scss';
import promoStyles from '../promoStyles.scss';

class ArticleListContainer extends Component {
  render() {
    return (
      <ArticleList
        heroStyles={heroStyles}
        promoStyles={promoStyles}
        {...this.props}
      />
    );
  }
}

export default articleListHoc(ArticleListContainer,
  {
    searchURL: '/aya/article/search/',
    articleURL: '/aya/article/',
    slug: 'aya-articles',
    tagId: 5
  }
);
