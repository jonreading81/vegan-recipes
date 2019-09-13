import React, { Component } from 'react';
import {Profile} from 'components';
import articleList from 'hoc/ArticleList';

class JonProfile extends Component {

  render() {
    return (
      <Profile
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

export default articleList(JonProfile,
  {
    searchURL: '/therapy/list/',
    articleURL: '/article/',
    slug: 'therapy',
    tagId: 7
  }
);
