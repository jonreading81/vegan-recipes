import React, { Component, PropTypes } from 'react';
import {ResponsiveImage, IconButton} from 'components';

export default class Inspiration extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
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
    return !this.state.showQuote ? styles.quoteWrapper + ' ' + styles.quoteWrapperHidden : styles.quoteWrapper;
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
           <div className={styles.imageWrapper}>
            <ResponsiveImage image={image}/>
            <If condition={quote !== ''}>
              <IconButton type="bolt" onClick={::this.toggleQuote} style={styles.icon} />
            </If>
          </div>
          <If condition={quote !== ''}>
            <div className={this.getQuoteClass(styles)}>
              <blockquote>{quote}</blockquote>
              <cite>{author}</cite>
            </div>
          </If>
        </div>
      </div>
    );
  }
}

