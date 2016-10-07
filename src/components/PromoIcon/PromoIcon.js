import React, { Component, PropTypes } from 'react';

export default class PromoIcon extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired,
    style: PropTypes.string
  };

  render() {
    const {type, onClick, style} = this.props;
    return (
      <p className={'icon-promo fa-stack fa-lg ' + style}
        onClick={onClick}>
        <i className="fa fa-stack-2x"></i>
        <i className={'fa fa-' + type + ' fa-stack-1x'}></i>
      </p>
    );
  }
}

