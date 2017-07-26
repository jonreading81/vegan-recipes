import React, {Component} from 'react';
import { sortable } from 'react-sortable';
import { ListGroupItem } from 'react-bootstrap';

class ListItem extends Component {

  render() {
    return (
      <ListGroupItem {...this.props}>{this.props.children}</ListGroupItem>
    );
  }
}

export default sortable(ListItem);
