import React, { Component, PropTypes } from 'react';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';


export default class MultiValueFieldActions extends Component {

  static propTypes = {
    field: PropTypes.object,
    index: PropTypes.number,
  }

  render() {
    const {field, index} = this.props;

    return (
      <ButtonToolbar>
         <ButtonGroup >
          <Button disabled={index === 0} onClick={() => {
            field.swapFields(index, index - 1);  // swap field with it's predecessor
          }}><i className="fa fa-chevron-up"/>
          </Button>
          <Button disabled={index === field.length - 1} onClick={() => {
            field.swapFields(index, index + 1); // swap field with it's successor
          }}><i className="fa fa-chevron-down" />
          </Button>
        </ButtonGroup>
        <Button onClick={() => {
          field.removeField(index);  // remove from index
        }}><i className="fa fa-trash"/> Remove
        </Button>
      </ButtonToolbar>
    );
  }
}

