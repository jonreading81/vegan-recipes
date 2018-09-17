import React, { Component, PropTypes} from 'react';
import {AyaArticleList} from 'components';
import articleListHoc from 'hoc/ArticleList';
import heroStyles from '../heroPanel.scss';
import promoStyles from '../promoStyles.scss';

import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import requestPage from 'redux/asyncConnection/requestPage';
import mapPageToProps from 'redux/mapStateToProps/page';

@connect(mapPageToProps)
@asyncConnect([requestPage('aya-product')])
class ArticleListContainer extends Component {

  static propTypes = {
    promoUnitType: PropTypes.string,
    articleHelper: PropTypes.object.isRequired
  }

  render() {
    const promoUnitType = 'ayaProduct';
    const {articleHelper} = this.props;
    const content = htmlToReactParser.parse('<div>' + articleHelper.getContent() + '</div>');
    return (
      <AyaArticleList
        heroStyles={heroStyles}
        promoStyles={promoStyles}
        promoUnitType={promoUnitType}
        content={content}
        {...this.props}
      />
    );
  }
}

export default articleListHoc(ArticleListContainer,
  {
    searchURL: '/aya/product/search/',
    articleURL: '/aya/product/',
    slug: 'aya-products',
    tagId: 6
  }
);
