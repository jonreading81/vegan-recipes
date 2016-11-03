import React, { Component, PropTypes } from 'react';
import {Link as ReactLink} from 'react-router';

export default class Link extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  isExternal(to) {
    return (to.substr(0, 4) === 'http');
  }

  render() {
    const {to, children, ...rest} = this.props;
    const isExternal = this.isExternal(to);
    return (
      <span>
        <If condition={!isExternal}>
          <ReactLink to={to} {...rest}>{children}</ReactLink>
        </If>

        <If condition={isExternal}>
          <a href={to} target="_blank" {...rest}>{children}</a>
        </If>
      </span>
    );
  }
}
