import React, { Component, PropTypes } from 'react';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);

export default class StandaloneQuote extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  render() {
    const {quote, author, color} = this.props;
    const styles = require('./StandaloneQuote.scss');
    const coreStyles = require('./Inspiration.scss');
    const quoteComponent = htmlToReactParser.parse('<div>' + quote + '</div>');
    return (
      <div>
        <div className={coreStyles.container}>
          <div className={styles.quoteWrapper + ' ' + coreStyles[color]}>
            <div className={styles.quoteLining}>
              <div className={styles.quoteTypeWrapper}>
                <div className={styles.quoteType}>
                   <blockquote>{quoteComponent}</blockquote>
                  <cite>{author}</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

