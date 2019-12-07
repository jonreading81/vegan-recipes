import React, { Component } from 'react';
import {TwoColGrid} from 'components';
import articleListHoc from 'hoc/ArticleList';

class AmyProfile extends Component {

  render() {
    return (
      <TwoColGrid
          meta={[
            {name: 'description', content: 'Amys Profile'},
            {name: 'keywords', content: 'therapy, meditation'}
          ]}
          articlesTitle="Amys Articles"
          youTubeChannelId="UCt10rx8sYa3fJxOQvfxd8SA"
          {...this.props}
      />
    );
  }
}

export default articleListHoc(AmyProfile,
  {
    searchURL: '/therapy/list/',
    slug: 'therapy',
    tagId: 7,
    articleURL: '/article/'
  }
);
