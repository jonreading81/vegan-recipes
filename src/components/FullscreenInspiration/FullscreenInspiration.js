import React, { Component, PropTypes } from 'react';
import {ResponsiveImage, PromoIcon} from 'components';

export default class FullscreenInspiration extends Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      showQuote: true
    };
  }

  getQuoteClass(styles) {
    return this.state.showQuote ? styles.quoteWrapper + ' ' + styles.quoteWrapperHidden : styles.quoteWrapper;
  }

  toggleQuote() {
    this.setState({ showQuote: !this.state.showQuote });
  }

  render() {
    const {image, quote, author} = this.props;
    const styles = require('./FullscreenInspiration.scss');
    return (
      <div className={styles.container}>
         <div className={styles.imageWrapper}>
          <ResponsiveImage image={image}/>
          <If condition={quote !== ''}>
            <PromoIcon type="bolt" onClick={::this.toggleQuote} style={styles.icon} />
          </If>
        </div>
        <If condition={quote !== ''}>
          <div className={this.getQuoteClass(styles)}>
            <blockquote>{quote}</blockquote>
            <cite>{author}</cite>
          </div>
        </If>
      </div>
    );
  }
}

