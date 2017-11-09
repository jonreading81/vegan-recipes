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
            <HeroPanel image={page.getImage()} title={page.getTitle()} style="image-focus-button">
              {subTextComponent}
            </HeroPanel>
            <div className="container">
              <div className="column-large">
                <div className="row text-center page-quote">
                    {subTextComponent}
                </div>
                <div className={styles.contact}>
                  {content}
                  <dl>
                      <dt className={styles.socialMediaList}>Social Media</dt>
                      <dd>
                        <ul className="list-inline">
                            <li>
                            <a className="socialLink socialLinkAya" href="https://twitter.com/ayaplantbased">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            <a className="socialLink socialLinkAya" href="https://instagram.com/ayaplantbased">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                            <span>@ayaplantbased</span>
                        </ul>
                      </dd>
                      <dt>Email</dt>
                      <dd>
                        <p>
                            <a className="socialLink socialLinkAya" href="mailto:hello@ayaplantbased.com">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            <span className={styles.emailAddress}><a href="mailto:hello@ayaplantbased.com">hello@ayaplantbased.com</a></span>
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
