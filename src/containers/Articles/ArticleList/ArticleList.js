import React, { Component } from 'react';
import {ArticleList} from 'components';
import articleListHoc from 'hoc/ArticleList';

class ArticleListContainer extends Component {
  render() {
    return (
      <ArticleList
        {...this.props}
      />
    );
  }
}

export default articleListHoc(ArticleListContainer,
  {
    searchURL: '/article/search/',
    articleURL: '/article/',
    slug: 'articles',
    tagId: 2
  }
);
