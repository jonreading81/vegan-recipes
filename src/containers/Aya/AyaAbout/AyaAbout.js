import React, { Component, PropTypes } from 'react';
import {Article as ArticleComponent} from 'components';
import requestPage from 'redux/asyncConnection/requestPage';
import mapPageToProps from 'redux/mapStateToProps/page';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import heroStyles from '../heroPanel.scss';

@connect(mapPageToProps)
@asyncConnect([requestPage('aya-about')])
export default class AyaAbout extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {articleHelper, isFetching} = this.props;
    return (
      <ArticleComponent
          article={articleHelper}
          isFetching={isFetching}
          heroStyles={heroStyles}
      />
    );
  }
}
