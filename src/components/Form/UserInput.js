import React, { Component, PropTypes } from 'react';
import {FormControl} from 'react-bootstrap';


export default class UserInput extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired
  };
  render() {
    const {field, placeholder} = this.props;
    return (
      <div className="input-group margin-bottom-sm">
        <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
        <FormControl type="text" placeholder={placeholder} {...field}/>
      </div>
    );
  }
}

