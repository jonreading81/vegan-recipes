import React from 'react';
import { sortable } from 'react-sortable';
import { ListGroupItem } from 'react-bootstrap';

function ListItem(props) {
  return (
    <ListGroupItem {...props}>{props.children}</ListGroupItem>
  );
}

export default sortable(ListItem);
