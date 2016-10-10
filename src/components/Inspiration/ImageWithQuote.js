import React, { Component, PropTypes } from 'react';
import {ResponsiveImage, IconButton} from 'components';

export default class ImageWithQuote extends Component {

  static propTypes = {
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

  getHiddenClass(styles) {
    if (!this.state.showQuote) {
      return styles.quoteWrapperHidden;
    }
  }

  toggleQuote() {
    this.setState({ showQuote: !this.state.showQuote });
    if (this.props.toggleQuote) {
      this.props.toggleQuote(!this.state.showQuote );
    }
  }

  render() {
    const {image, quote, author, color} = this.props;
    const styles = require('./ImageWithQuote.scss');
    const coreStyles = require('./Inspiration.scss');
    return (
      <div>
        <div className={coreStyles.container}>
         <div className={styles.imageWrapper}>
          <ResponsiveImage image={image}/>
          <If condition={quote !== ''}>
            <IconButton type="bolt" onClick={::this.toggleQuote} style={coreStyles.icon} />
          </If>
          </div>
          <If condition={quote !== ''}>
            <div className={styles.quoteWrapper + ' ' + coreStyles[color] + ' ' + this.getHiddenClass(styles)}>
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

