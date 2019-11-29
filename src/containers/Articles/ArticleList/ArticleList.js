import React, { Component } from 'react';
import {ArticleList} from 'components';
import articleListHoc from 'hoc/ArticleList';

class ArticleListContainer extends Component {
  render() {
    console.log('articelListContainer', this.props);
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
