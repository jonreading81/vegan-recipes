import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel, Loading} from 'components';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import get from 'lodash/get';
import heroStyles from '../heroPanel.scss';

@connect(
  (state) => {
    return {
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
    };
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('aya-products'));
    }
  },
])
export default class AyaProducts extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
    children: PropTypes.node,
    isFetching: PropTypes.bool.isRequired
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
