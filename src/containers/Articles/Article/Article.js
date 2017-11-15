import React, { PropTypes, Component } from 'react';
import {Article as ArticleComponent} from 'components';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import article from 'hoc/Article';

class ArticleContainer extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool,
  }

  render() {
    const {articleHelper, isFetching} = this.props;
    return (
      <ArticleComponent article={articleHelper} isFetching={isFetching}>
         <BreadcrumbContainer>
          <LinkContainer to={'/article'}>
            <Breadcrumb.Item>Articles</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>{articleHelper.getTitle()}</Breadcrumb.Item>
        </BreadcrumbContainer>
      </ArticleComponent>
    );
  }
}

export default article(ArticleContainer);
