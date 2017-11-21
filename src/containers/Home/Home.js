import config from '../../config';
import React, { Component, PropTypes } from 'react';
import {Article as ArticleComponent} from 'components';
import requestPage from 'redux/asyncConnection/requestPage';
import mapPageToProps from 'redux/mapStateToProps/page';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';

@connect(mapPageToProps)
@asyncConnect([requestPage('home')])
export default class Home extends Component {

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
      >
        <audio controls>
          <source src={config.app.birdsong} type="audio/mp3" />
        </audio>
      </ArticleComponent>
    );
  }
}
