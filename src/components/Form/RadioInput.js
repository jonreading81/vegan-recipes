import React, { Component, PropTypes } from 'react';
import {FormControl} from 'react-bootstrap';


export default class EmailInput extends Component {

  static propTypes = {
    email: PropTypes.object.isRequired
  };
  render() {
    const {email} = this.props;
    return (
      <div className="input-group margin-bottom-sm">
        <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
        <FormControl type="text" placeholder="Enter Email" {...email}/>
      </div>
    );
  }
}

