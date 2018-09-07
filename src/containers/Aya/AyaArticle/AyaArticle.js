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
    isFetching: PropTypes.bool,
    heroPanelTheme: PropTypes.string
  }

  render() {
    const {articleHelper, isFetching} = this.props;
    const heroPanelTheme = 'col-lg-8 col-lg-offset-2';
    const styles = require('./AyaArticle.scss');
    return (
      <ArticleComponent
          article={articleHelper}
          isFetching={isFetching}
          heroStyles={heroStyles}
          hasBreadcrumb
          heroPanelTheme={heroPanelTheme}
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
