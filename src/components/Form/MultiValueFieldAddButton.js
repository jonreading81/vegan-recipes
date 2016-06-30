import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

export default class MultiValueFieldActions extends Component {

  static propTypes = {
    field: PropTypes.object,
    title: PropTypes.string,
  }

  render() {
    const {field, title} = this.props;

    return (
      <div>
        <Button onClick={() => {
          field.addField();    // pushes empty child field onto the end of the array
        }}><i/>{title}
        </Button>
      </div>
    );
  }
}

