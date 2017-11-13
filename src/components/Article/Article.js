import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel, Loading} from 'components';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);


export default class Article extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
    children: PropTypes.node,
    isFetching: PropTypes.bool,
    heroStyles: PropTypes.string,
    hasFixedBreadcrumb: PropTypes.string
  }

  render() {
    const {hasFixedBreadcrumb, article, isFetching, heroStyles, children} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + article.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + article.getSubText() + '</div>');
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
            <HeroPanel image={article.getImage()} title={article.getTitle()} styles={heroStyles} hasFixedBreadcrumb={hasFixedBreadcrumb}>
            {subTextComponent}
            </HeroPanel>
            {children}
            <div className="container">
              <div className="body-copy">{contentComponent}</div>
            </div>
          </If>
        </div>
    );
  }
}
