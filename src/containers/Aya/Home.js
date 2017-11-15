import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/wordpress/page';
import get from 'lodash/get';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';
import {HeroPanel, Loading} from 'components';
import heroStyles from './heroPanel.scss';

@connect(
  (store) => {
    return {
      page: new ArticleHelper(get(store.viewPage, 'entity.docs[0]')),
      isFetching: get(store.viewPage, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch( requestGet('aya-home'));
  }
}])
export default class Home extends Component {

  static propTypes = {
    page: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {page, isFetching, children} = this.props;
    const content = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    return (
      <div>
        <Helmet title={page.getTitle()} />
        <If condition={isFetching}>
          <Loading />
        </If>
        <If condition={!isFetching}>
            <HeroPanel styles={heroStyles} image={page.getImage()} title={page.getTitle()} style="image-focus-button">
              {subTextComponent}
            </HeroPanel>
            {children}
            <div className="container">
              <div className="body-copy">{content}</div>
            </div>
        </If>
      </div>
    );
  }
}
