import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ItemsGrid, Loading} from 'components';
import {Pagination} from 'react-bootstrap';
import {HeroPanel} from 'components';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';


export default class ArticleList extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    articlesTitle: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
    articleURL: PropTypes.array.isRequired,
    heroStyles: PropTypes.object,
    pages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getArticles: PropTypes.func.isRequired,
  }

  getArticles(page) {
    this.props.getArticles(page);
  }

  render() {
    const {heroStyles, articles, page, isFetching, meta, pages, activePage, articlesTitle, articleURL} = this.props;
    const title = page.getTitle();
    const articleItems = ArticleHelper.mapToItems(articles, {baseURL: articleURL});
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    const sidePanelComponent = htmlToReactParser.parse('<div>' + page.getSidePanel() + '</div>');
    const contentComponent = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');

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
          <div className="column-large">
            <If condition={ articles.length === 0 }>
              <h4>No Articles</h4>
            </If >
            <If condition={ articles.length !== 0 && articlesTitle !== ''}>
              <h3>{articlesTitle}</h3>
            </If >
            <ItemsGrid items={articleItems}/>
            <If condition={ pages > 1 }>
               <Pagination bsSize="medium" items={pages} activePage={activePage} onSelect={::this.getArticles} />
            </If>
           </div>
         </div>
      </div>
    );
  }
}
