import React, { Component, PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class ConfirmationModal extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object,
    show: PropTypes.bool,
    close: PropTypes.func,
    confirm: PropTypes.func}

  render() {
    const { title, show, children, close, confirm } = this.props;

    return (
      <Modal show={show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
             <Button onClick={confirm}>OK</Button>
            <Button onClick={close}>Cancel </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

