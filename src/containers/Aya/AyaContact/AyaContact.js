import React, { Component, PropTypes } from 'react';
import {Loading} from 'components';
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
      return dispatch(requestPage('aya-contact'));
    }
  },
])
export default class AyaAbout extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
    children: PropTypes.node,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {page, isFetching, children} = this.props;
    const content = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    const styles = require('./AyaContact.scss');
    return (
      <div>
        <If condition={isFetching}>
          <Loading />
        </If>
        <If condition={!isFetching}>
            {subTextComponent}
            {children}
            <div className="container">
              <div className="column-large">
                <div className={styles.contact}>
                  {content}
                </div>
              </div>
            </div>
        </If>
      </div>
    );
  }
}
