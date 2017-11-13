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
      return dispatch(requestPage('aya-contact'));
    }
  },
])
export default class AyaContact extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {page, isFetching} = this.props;
    const content = htmlToReactParser.parse('<div>' + page.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + page.getSubText() + '</div>');
    const styles = require('./AyaContact.scss');
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
            <div className="container">
              <div className="column-large">
                <div className={styles.contact}>
                  {content}
                  <dl>
                      <dt className={styles.socialMediaList}>Social Media</dt>
                      <dd>
                        <ul className="list-inline">
                            <li>
                            <a href="https://twitter.com/ayaplantbased">https://twitter.com/ayaplantbased
                            </a>
                            </li>
                            <li>
                            <a href="https://instagram.com/ayaplantbased">https://instagram.com/ayaplantbased
                            </a>
                            </li>
                        </ul>
                      </dd>
                      <dt>Email</dt>
                      <dd>
                        <p>
                            <a href="mailto:hello@ayaplantbased.com">mailto:hello@ayaplantbased.com
                            </a>
                        </p>
                      </dd>
                      <dt>Address</dt>
                      <dd>
                        <p>
                           193A Munster Road, SW6 6BY, London, United Kingdom
                        </p>
                      </dd>
                  </dl>
                </div>
              </div>
            </div>
        </If>
      </div>
    );
  }
}
