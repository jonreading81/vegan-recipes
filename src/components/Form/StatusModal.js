import React, { Component, PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class ErrorModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.object,
    title: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
  }

  render() {
    const {close, show, title, children } = this.props;
    return (
      <Modal show={show} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
             <Button onClick={close}>OK</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

