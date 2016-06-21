import React, { Component, PropTypes } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
      <ListGroup>
            {this.props.items.map((item, index) =>
              <ListGroupItem key={index} href={item.url} header={item.title}>{item.description}</ListGroupItem>
            )}
          </ListGroup>
      </div>
    );
  }
}

