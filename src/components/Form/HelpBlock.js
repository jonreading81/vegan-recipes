import React, { Component, PropTypes } from 'react';
import {HelpBlock} from 'react-bootstrap';


export default class ReduxFormHelpBlock extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired
  };
  render() {
    const {field, helpBlockClassName} = this.props;
    return (
      <div>
       {field.touched && field.error && <HelpBlock className={helpBlockClassName}>{field.error}</HelpBlock>}
      </div>
    );
  }
}

