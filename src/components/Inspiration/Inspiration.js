import React, { Component, PropTypes } from 'react';
import ImageWithQuote from './ImageWithQuote';
import StandaloneQuote from './StandaloneQuote';

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

  toggleQuote() {
    this.setState({ showQuote: !this.state.showQuote });
    if (this.props.toggleQuote) {
      this.props.toggleQuote(!this.state.showQuote );
    }
  }

  render() {
    const {image, quote, author, color} = this.props;
    return (
      <div>
        <If condition={image && image !== ''}>
          <ImageWithQuote toggleQuote={::this.toggleQuote} image={image} quote={quote} author={author} showQuote={this.state.showQuote} color={color}/>
        </If>
        <If condition={!image || image === ''}>
          <StandaloneQuote quote={quote} author={author} color={color}/>
        </If>
      </div>
    );
  }
}

