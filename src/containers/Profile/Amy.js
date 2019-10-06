import React, { Component } from 'react';
import {TwoColGrid} from 'components';
import articleList from 'hoc/ArticleList';

class AmyProfile extends Component {

  render() {
    return (
      <TwoColGrid
          meta={[
            {name: 'description', content: 'Amys Profile'},
            {name: 'keywords', content: 'therapy, meditation'}
          ]}
          articlesTitle="Amys Articles"
          {...this.props}
      />
    );
  }
}

export default articleList(AmyProfile,
  {
    searchURL: '/therapy/list/',
    articleURL: '/article/',
    slug: 'therapy',
    tagId: 7
  }
);
