import React, { Component, PropTypes } from 'react';
import {Breadcrumb} from 'react-bootstrap';


export default class BreadcrumbComponent extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };
  render() {
    const {children} = this.props;
    const className = this.props.className || '';
    return (
      <div className={`breadcrumb-wrapper ${className}`}>
        <div className="container-fluid">
        <Breadcrumb>{children}</Breadcrumb>
        </div>
      </div>
    );
  }
}
