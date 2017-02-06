import React, { PropTypes, Component } from 'react';
import config from '../../config';
import {Page} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/wordpress/page';
import get from 'lodash/get';
import Article from 'helpers/Article';
import Helmet from 'react-helmet';

@connect(
  (store) => {
    return {
      article: new Article(get(store.viewPage, 'entity.docs[0]')),
      isFetching: get(store.viewPage, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch( requestGet('home'));
  }
}])
export default class Home extends Component {

  static propTypes = {
    article: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {article, isFetching} = this.props;
    return (
      <Page article={article} isFetching={isFetching} heroStyle="image-focus-bottom">
        <Helmet title="Home" />
        <audio controls>
          <source src={config.app.birdsong} type="audio/mp3" />
        </audio>
      </Page>
    );
  }
}
