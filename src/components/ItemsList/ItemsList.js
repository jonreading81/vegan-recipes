import React, { Component, PropTypes } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
      <ListGroup>
            {this.props.items.map((item, index) =>
              <LinkContainer to={item.URL}>
                <ListGroupItem header={item.title} key={index}>
                  <p>{item.description}</p>
                </ListGroupItem>
              </LinkContainer>
            )}
          </ListGroup>
      </div>
    );
  }
}

