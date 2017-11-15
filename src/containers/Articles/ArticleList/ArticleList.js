import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ItemsList, SearchWell, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import {HeroPanel} from 'components';
import articleList from 'hoc/ArticleList';

class ArticleListContainer extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    searching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getArticles: PropTypes.func.isRequired
  }

  render() {
    const {
      articles,
      searching,
      page,
      pages,
      isFetching,
      searchArticles,
      getArticles,
      subTextComponent,
      activePage,
      articleItems

    } = this.props;

    return (
      <div>
        <Helmet title={page.getTitle()}/>
          <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={page.getImage()} title={page.getTitle()} heroStyle="image-focus-bottom">
               {subTextComponent}
            </HeroPanel>
          </If>
        <div className="container ">
          <div className="column-large">
            <SearchWell searching={searching} onSubmit={searchArticles} />
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If >
            <ItemsList items={articleItems}/>
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}

export default articleList(ArticleListContainer,
  {
    searchURL: '/article/search/',
    articleURL: '/article/',
    slug: 'articles',
    tagId: 2
  }
);
