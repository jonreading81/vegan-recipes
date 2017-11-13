import React, { PropTypes, Component } from 'react';
import {Article as ArticleComponent} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/wordpress/post';
import get from 'lodash/get';
import Article from 'helpers/Article';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import heroStyles from './heroPanel.scss';

@connect(
  (store) => {
    return {
      articleHelper: new Article(get(store.viewPost, 'entity.docs[0]')),
      isFetching: get(store.viewPost, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch( requestGet(params.article));
  }
}])
export default class ArticleContainer extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool,
  }

  render() {
    const {articleHelper, isFetching} = this.props;
    return (
      <ArticleComponent
          article={articleHelper}
          isFetching={isFetching}
          heroStyles={heroStyles}
          >
         <BreadcrumbContainer className="breadcrumb-wrapper--aya">
          <LinkContainer to={'/aya/article/list'}>
            <Breadcrumb.Item>Articles</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>{articleHelper.getTitle()}</Breadcrumb.Item>
        </BreadcrumbContainer>
      </ArticleComponent>
    );
  }
}
