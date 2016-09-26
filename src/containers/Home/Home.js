import React, { PropTypes, Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {HeroPanel, Loading} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/articles/view';
import get from 'lodash/get';
import Article from 'helpers/Article';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);

@connect(
  (store) => {
    return {
      article: new Article(get(store.viewArticle, 'entity[0]')),
      isFetching: get(store.viewRecipe, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch( requestGet('article-1'));
  }
}])
export default class Home extends Component {

  static propTypes = {
    article: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {article, isFetching} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + article.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + article.getSubText() + '</div>');
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Home"/>
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={article.getImage()} audio={config.app.birdsong} title={article.getTitle()}style="image-focus-bottom">
            {subTextComponent}
            </HeroPanel>
            <div className="container">
              <div className="body-copy">{contentComponent}</div>
            </div>
          </If>
        </div>
    );
  }
}
