import React, { Component, PropTypes} from 'react';
import {AyaArticleList} from 'components';
import articleListHoc from 'hoc/ArticleList';
import heroStyles from '../heroPanel.scss';
import promoStyles from '../promoStyles.scss';

class ArticleListContainer extends Component {

  static propTypes = {
    promoUnitType: PropTypes.string
  }

  render() {
    const promoUnitType = 'ayaArticle';
    return (
      <AyaArticleList
        heroStyles={heroStyles}
        promoStyles={promoStyles}
        promoUnitType={promoUnitType}
        {...this.props}
      />
    );
  }
}

export default articleListHoc(ArticleListContainer,
  {
    searchURL: '/aya/articles/search/',
    articleURL: '/aya/articles/',
    slug: 'aya-articles',
    tagId: 5
  }
);
