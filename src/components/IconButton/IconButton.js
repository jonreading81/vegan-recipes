import React, { Component, PropTypes } from 'react';

export default class IconButton extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired,
    styles: PropTypes.object
  };

  render() {
    const {type, onClick} = this.props;

    const _styles = {
      iconWrapper: '',
      icon: '',
      ...this.props.styles
    };
    const styles = require('./IconButton.scss');
    return (
      <p className={'fa-stack fa-lg ' + styles.iconWrapper + ' ' + _styles.iconWrapper}
        onClick={onClick}>
        <i className="fa fa-stack-2x"></i>
        <i className={'fa fa-' + type + ' fa-stack-1x ' + styles.icon + ' ' + _styles.icon}></i>
      </p>
    );
  }
}

