import React, { Component, PropTypes } from 'react';
import {HelpBlock} from 'react-bootstrap';


export default class ReduxFormHelpBlock extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired
  };
  render() {
    const {field} = this.props;
    return (
      <div>
       {field.touched && field.error && <HelpBlock>{field.error}</HelpBlock>}
      </div>
    );
  }
}

