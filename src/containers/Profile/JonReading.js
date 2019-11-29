import React, { Component } from 'react';
import {Profile} from 'components';
import articleListHoc from 'hoc/ArticleList';

class JonProfile extends Component {

  render() {
    return (
      <Profile
          meta={[
            {name: 'description', content: 'Jon Readings Yoga Teacher Profile'},
            {name: 'keywords', content: 'yoga, hatha'}
          ]}
          articlesTitle="Jons Articles"
          {...this.props}
      />
    );
  }
}

export default articleListHoc(JonProfile,
  {
    searchURL: '/jon-reading/list/',
    articleURL: '/article/',
    slug: 'jon-reading',
    tagId: 4
  }
);
