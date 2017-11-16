import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {AyaRetailPage} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import requestPage from 'redux/asyncConnection/requestPage';
import mapPageToProps from 'redux/mapStateToProps/page';

@connect(mapPageToProps)
@asyncConnect([requestPage('aya-retail')])
export default class AyaRetail extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {articleHelper, isFetching, contentComponent} = this.props;
    return (
      <div>
        <Helmet title={articleHelper.getTitle()}/>
        <If condition={!isFetching}>
          <AyaRetailPage selected="retail">
            <If condition={contentComponent.props.children}>
                 {contentComponent.props.children.map((child) => child)}
            </If>
        </AyaRetailPage>
        </If>
      </div>
    );
  }
}
