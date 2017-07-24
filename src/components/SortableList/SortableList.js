import React, {Component, PropTypes} from 'react';
import { ListGroup } from 'react-bootstrap';
import SortableListItem from './SortableListItem';

class SortableList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
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
    this.props.onChange(obj);
  }

  render() {
    const className = (this.props.className) ? 'sortable-list ' + this.props.className : 'sortable-list';
    const listItems = this.state.data.items.map((item, idx) => {
      return (
        <SortableListItem
          key={idx}
          updateState={this.updateState.bind(this)}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={idx}
          outline="list"
          >{item}</SortableListItem>
      );
    }, this);

    return (
      <ListGroup className={className}>{listItems}</ListGroup>
    );
  }
}

export default SortableList;
