import React, { Component, PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class RecipeFormConfirmation extends Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    cancel: PropTypes.func,
    confirm: PropTypes.func}

  render() {
    const {
      // recipe,
      title,
      message,
      cancel,
      confirm
      } = this.props;

    return (
      <Modal show="true" onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
             <Button onClick={confirm}>OK</Button>
            <Button onClick={cancel}>Cancel </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

