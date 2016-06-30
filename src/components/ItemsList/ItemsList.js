import React, { Component, PropTypes } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, ButtonToolbar, Col, Row } from 'react-bootstrap';

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./ItemsList.scss');
    return (
      <div>
      <ListGroup>
            {this.props.items.map((item, index) =>
              <ListGroupItem header={item.title} key={index}>
              <Row >
              <Col xs={4}>
                <p>{item.description}</p>
              </Col>
              <Col xs={8}>
                <ButtonToolbar className={styles.toolbar} >
                  <LinkContainer to={item.URL}>
                    <Button bsSize="large" >View</Button>
                  </LinkContainer>
                  <LinkContainer to={item.updateURL}>
                    <Button bsSize="large" >Update</Button>
                  </LinkContainer>
                  <LinkContainer to={item.deleteURL}>
                    <Button bsSize="large" >Delete</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </Row>
            </ListGroupItem>
            )}
          </ListGroup>
      </div>
    );
  }
}

