import React, { Component, PropTypes } from 'react';
import {Breadcrumb} from 'react-bootstrap';


export default class BreadcrumbComponent extends Component {

  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const {children} = this.props;
    return (
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
        <Breadcrumb>{children}</Breadcrumb>
        </div>
      </div>
    );
  }
}

