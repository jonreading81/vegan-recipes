import React, { PropTypes, Component } from 'react';
import {Article as ArticleComponent} from 'components';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import heroStyles from '../heroPanel.scss';
import requestPostWithParam from 'redux/asyncConnection/requestPostWithParam';
import mapPostToProps from 'redux/mapStateToProps/post';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';

@connect(mapPostToProps)
@asyncConnect([requestPostWithParam('article')])
class ArticleContainer extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {articleHelper, isFetching, url} = this.props;
    const styles = require('./AyaArticle.scss');
    console.log('url', url);
    return (
      <ArticleComponent
          url={url}
          article={articleHelper}
          isFetching={isFetching}
          heroStyles={heroStyles}
          hasBreadcrumb
          >
         <BreadcrumbContainer className={`${styles.breadcrumbwrapper} breadcrumb-wrapper--aya`}>
            <Breadcrumb.Item href="/aya/article">Articles</Breadcrumb.Item>
            <Breadcrumb.Item active>{articleHelper.getTitle()}</Breadcrumb.Item>
        </BreadcrumbContainer>
      </ArticleComponent>
    );
  }
}

export default ArticleContainer;
