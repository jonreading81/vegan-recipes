/* eslint react/prop-types: 0 */
import React, {Component, PropTypes} from 'react';
import { sortable } from 'react-sortable';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function ListItem(props) {
  return (
     <ListGroupItem {...props}>{props.children}</ListGroupItem>
  );
}

const SortableListItem = sortable(ListItem);

class SortableList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null,
      data: this.props.data
    };
  }

  updateState(obj) {
    this.setState(obj);
    console.log(obj);
  }

  render() {
    const childProps = { className: 'myClass1' };
    const listItems = this.state.data.items.map((item, idx) => {
      return (
        <SortableListItem
          key={idx}
          updateState={this.updateState.bind(this)}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={idx}
          outline="list"
          childProps={childProps}
          >{item}</SortableListItem>
      );
    }, this);

    return (
      <ListGroup>{listItems}</ListGroup>
    );
  }
}

export default SortableList;
