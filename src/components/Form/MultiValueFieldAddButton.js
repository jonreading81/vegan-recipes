import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

export default class MultiValueFieldActions extends Component {

  static propTypes = {
    field: PropTypes.any,
    className: PropTypes.string,
    title: PropTypes.string,
  }

  render() {
    const {field, title, className} = this.props;

    return (
      <div>
        <Button bsClass={className} onClick={() => {
          field.addField();    // pushes empty child field onto the end of the array
        }}><i className="fa fa-edit"/> {title}
        </Button>
      </div>
    );
  }
}

