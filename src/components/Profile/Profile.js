import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ItemsList, ItemsGrid, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import {HeroPanel} from 'components';


export default class ArticleList extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    isList: PropTypes.bool,
    page: PropTypes.object.isRequired,
    articlesTitle: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
    articleURL: PropTypes.array.isRequired,
    heroStyles: PropTypes.object,
    promoStyles: PropTypes.object,
    pages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getArticles: PropTypes.func.isRequired,
  }

  getArticles(page) {
    this.props.getArticles(page);
  }

  render() {
    const {
      isList,
      heroStyles,
      articles,
      page,
      isFetching,
      meta,
      pages,
      activePage,
      articlesTitle,
      promoStyles,
      subTextComponent,
      sidePanelComponent,
      contentComponent,
      articleItems
    } = this.props;

    const title = page.getTitle();
    return (
      <div>
        <Helmet title={title}
          meta={[
            {meta}
          ]}/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel styles={heroStyles} image={page.getImage()} title={title}>
               {subTextComponent}
            </HeroPanel>
             <div className="container">
              <div className="body-panel">{contentComponent}</div>
              <div className="side-panel">{sidePanelComponent}</div>
            </div>
          </If>
         <div className="container ">
          <div className="body-panel">
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If >
            <If condition={ articles.length !== 0 && articlesTitle !== ''}>
              <h3>{articlesTitle}</h3>
            </If >
            <If condition={isList}>
                <ItemsList promoStyles={promoStyles} items={articleItems}/>
            </If >
            <If condition={!isList}>
                <ItemsGrid promoStyles={promoStyles} items={articleItems}/>
            </If >
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}
