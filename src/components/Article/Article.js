/* eslint-disable */
import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel, Loading, ArticleSocialLinks} from 'components';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);


export default class Article extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
    children: PropTypes.node,
    isFetching: PropTypes.bool,
    hasBreadcrumb: PropTypes.bool,
    heroStyles: PropTypes.string,
    bodyTheme: PropTypes.string
  }

  static defaultProps = {
    bodyTheme: 'body-copy'
  }

  render() {
    const {article, isFetching, heroStyles, children, hasBreadcrumb, heroPanelTheme, bodyTheme, url} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + article.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + article.getSubText() + '</div>');
    console.log('article', article);
    return (
      <div>
        <Helmet title={article.getTitle()}
          meta={[
            {
              name: 'description', content: article.getDescription()
            },
            {
              name: 'og:url',
              content: url
            }
          ]}/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel displayHeroPanel={article.isDisplayHeroPanel()} image={article.getImage()} title={article.getTitle()} styles={heroStyles} hasBreadcrumb={hasBreadcrumb}>
            {subTextComponent}
            </HeroPanel>
            {children}
            <div className="container">
              <div className={bodyTheme}>{contentComponent}</div>
              {hasBreadcrumb}
              <If condition={hasBreadcrumb === true}>
                <ArticleSocialLinks article={article} url={url}/>
              </If>
            </div>
          </If>
        </div>
    );
  }
}
