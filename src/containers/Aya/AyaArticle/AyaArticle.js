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
    const breadcrumbPath = this.props.location.pathname.split('/').slice(0, -1).join('/');
    const breadcrumbTitle = breadcrumbPath.split('/').pop();
    return (
      <ArticleComponent
          url={url}
          article={articleHelper}
          isFetching={isFetching}
          heroStyles={heroStyles}
          hasBreadcrumb
          bodyTheme="column-large"
          >
         <BreadcrumbContainer className={`${styles.breadcrumbwrapper} breadcrumb-wrapper--aya`}>
            <Breadcrumb.Item href={breadcrumbPath}>{breadcrumbTitle}</Breadcrumb.Item>
            <Breadcrumb.Item active>{articleHelper.getTitle()}</Breadcrumb.Item>
        </BreadcrumbContainer>
      </ArticleComponent>
    );
  }
}

export default ArticleContainer;
