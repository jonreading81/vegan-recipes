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
  }

  render() {
    const {article, isFetching, heroStyles, children, hasBreadcrumb} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + article.getContent() + '</div>');
    const subTextComponent = article.getSubText().length !== 0 ? htmlToReactParser.parse('<div>' + article.getSubText() + '</div>') : null;
    return (
      <div>
        <Helmet title={article.getTitle()}
          meta={[
            {name: 'description', content: article.getDescription()}
          ]}/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={article.getImage()} title={article.getTitle()} styles={heroStyles} hasBreadcrumb={hasBreadcrumb}>
            {subTextComponent}
            </HeroPanel>
            {children}
            <div className="container">
              <div className="body-copy">{contentComponent}</div>
              <ArticleSocialLinks/>
            </div>
          </If>
        </div>
    );
  }
}
