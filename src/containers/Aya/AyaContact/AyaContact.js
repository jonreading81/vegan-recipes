import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel, Loading} from 'components';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import heroStyles from '../heroPanel.scss';
import requestPage from 'redux/asyncConnection/requestPage';
import mapPageToProps from 'redux/mapStateToProps/page';

@connect(mapPageToProps)
@asyncConnect([requestPage('aya-contact')])
export default class AyaContact extends Component {

  static propTypes = {
    articleHelper: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {articleHelper, isFetching} = this.props;
    const content = htmlToReactParser.parse('<div>' + articleHelper.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + articleHelper.getSubText() + '</div>');
    return (
      <div>
        <Helmet title={articleHelper.getTitle()} />
        <If condition={isFetching}>
          <Loading />
        </If>
        <If condition={!isFetching}>
            <HeroPanel styles={heroStyles} displayHeroPanel={articleHelper.isDisplayHeroPanel()} image={articleHelper.getImage()} title={articleHelper.getTitle()} style="image-focus-center">
              {subTextComponent}
            </HeroPanel>
            <div className="container">
              <div className="column-large">
              <blockquote><p>No one can do it alone and no one can take all of the credit</p></blockquote>
                  {content}
                  <dl>
                      <dt>Social Media</dt>
                      <dd>
                        <ul className="ayaList">
                            <li>
                            <a href="https://twitter.com/ayaplantbased">https://twitter.com/ayaplantbased
                            </a>
                            </li>
                            <li>
                            <a href="https://instagram.com/ayaplantbased">https://instagram.com/ayaplantbased
                            </a>
                            </li>
                            <li>
                            <a href="https://facebook.com/ayaplantbased">https://facebook.com/ayaplantbased
                            </a>
                            </li>
                        </ul>
                      </dd>
                      <dt>Email</dt>
                      <dd>
                        <p>
                            <a href="mailto:hello@ayaplantbased.com">hello@ayaplantbased.com
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
        </If>
      </div>
    );
  }
}
