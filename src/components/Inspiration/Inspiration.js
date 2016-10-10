import React, { Component, PropTypes } from 'react';
import {ResponsiveImage, IconButton} from 'components';

export default class Inspiration extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    toggleQuote: PropTypes.func
  };

  constructor(...args) {
    super(...args);
    this.state = {
      showQuote: args[0].showQuote
    };
  }

  getQuoteClass(styles) {
    let quoteClass = styles.quoteWrapper;
    if (!this.props.image || this.props.image === '') {
      quoteClass = quoteClass + ' ' + styles.leadQuote;
    }else if (!this.state.showQuote) {
      quoteClass = quoteClass + ' ' + styles.quoteWrapperHidden;
    }
    quoteClass = quoteClass + ' ' + styles[this.props.color];
    return quoteClass;
  }

  toggleQuote() {
    this.setState({ showQuote: !this.state.showQuote });
    if (this.props.toggleQuote) {
      this.props.toggleQuote(!this.state.showQuote );
    }
  }

  render() {
    const {image, quote, author} = this.props;
    const styles = require('./Inspiration.scss');
    return (
      <div>
        <div className={styles.container}>
          <If condition={image && image !== ''}>
           <div className={styles.imageWrapper}>
            <ResponsiveImage image={image}/>
            <If condition={quote !== ''}>
              <IconButton type="bolt" onClick={::this.toggleQuote} style={styles.icon} />
            </If>
            </div>
          </If>
          <If condition={quote !== ''}>
            <div className={this.getQuoteClass(styles)}>
              <div className={styles.quoteLining}>
                <div className={styles.quoteTypeWrapper}>
                  <div className={styles.quoteType}>
                    <blockquote>{quote}</blockquote>
                    <cite>{author}</cite>
                  </div>
                </div>
              </div>
            </div>
          </If>
        </div>
      </div>
    );
  }
}

