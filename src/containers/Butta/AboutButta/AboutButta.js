import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ButtaPage} from 'components';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import get from 'lodash/get';

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
      return dispatch(requestPage('about-butta'));
    }
  },
])
export default class AboutButta extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {page, isFetching} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');
    console.log(contentComponent);
    return (
      <div>
        <Helmet title="About Butta"/>
        <If condition={!isFetching}>
          <ButtaPage selected="about">{contentComponent.props.children}</ButtaPage>
        </If>
      </div>
    );
  }
}
