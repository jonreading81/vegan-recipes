import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ItemsGrid, SearchWell, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import {HeroPanel} from 'components';

export default class AyaArticleListComponent extends Component {

  static propTypes = {
    results: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    searching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    heroStyles: PropTypes.object,
    promoStyles: PropTypes.object,
    getArticles: PropTypes.func.isRequired,
    gridColLg: PropTypes.object,
    gridColMd: PropTypes.object,
    gridColSm: PropTypes.object,
    gridColXs: PropTypes.object,
    promoUnitType: PropTypes.string
  }

  static defaultProp = {
    promoUnitType: 'callOfTheForest'
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
      articleItems,
      heroStyles,
      gridColMd,
      gridColSm,
      gridColXs,
      promoUnitType,
      content

    } = this.props;
    const gridColLg = 6;
    const pageTitle = this.props.location.pathname.split('/').pop();
    const promoStyles = require('./AyaPromoUnit.scss');
    return (
      <div>
        <Helmet title={page.getTitle()}/>
          <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel displayHeroPanel={page.isDisplayHeroPanel()} styles={heroStyles} image={page.getImage()} title={page.getTitle()} heroStyle="image-focus-bottom">
               {subTextComponent}
            </HeroPanel>
          </If>
        <div className="container ">
          <div className="column-large">
          <h1 className="visible-xs-block">{pageTitle}</h1>
            <If condition={ articles.length === 8 }>
              <SearchWell searching={searching} onSubmit={searchArticles} />
            </If>
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If>
            <ItemsGrid promoUnitType={promoUnitType} gridColXs={gridColXs} gridColSm={gridColSm} gridColMd={gridColMd} gridColLg={gridColLg} promoStyles={promoStyles} items={articleItems}/>
            <If condition={content && content.props && Array.isArray(content.props.children)}>
              {content.props.children.map((child) => child)}
            </If>
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}
