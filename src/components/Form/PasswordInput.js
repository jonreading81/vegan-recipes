import React, { Component, PropTypes } from 'react';
import {FormControl} from 'react-bootstrap';


export default class PasswordInput extends Component {

  static propTypes = {
    password: PropTypes.object.isRequired
  };
  render() {
    const {password} = this.props;
    return (
       <div className="input-group margin-bottom-sm">
          <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
          <FormControl type="password" placeholder="Enter Password" {...password}/>
        </div>
    );
  }
}

