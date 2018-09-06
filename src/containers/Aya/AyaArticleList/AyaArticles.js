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
    const promoUnitType = 'aya';
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
    searchURL: '/aya/article/search/',
    articleURL: '/aya/article/',
    slug: 'aya-articles',
    tagId: 5
  }
);
