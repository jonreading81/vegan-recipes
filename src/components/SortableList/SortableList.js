/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import update from 'react/lib/update';
import { ListGroup } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import SortableItem from './SortableItem';

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
class SortableList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    classNameDragging: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null
    };
    this.dataKeys = this.getDataKeys(props.data);
  }

  getDataKey(str) {
    return str.replace(/\W/g, '');
  }

  getDataKeys(data) {
    const dataKeys = {};
    let key;
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        dataKeys[this.getDataKey(data[key])] = key;
      }
    }
    return dataKeys;
  }

  moveCard(dragIndex, hoverIndex) {
    const {data, value} = this.props;
    const arrKeys = value.split(',');
    const draggedKey = arrKeys[dragIndex];
    const newKeys = update(arrKeys, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedKey],
      ],
    });
    this.props.onChange(newKeys.join(','));
  }

  updateState(obj) {
    this.setState(obj);
    if (obj.items && obj.items.length === Object.keys(this.dataKeys).length) {
      const orderedData = obj.items.map(item => this.dataKeys[this.getDataKey(item)]);
      this.props.onChange(orderedData.join(','));
    }
  }

  render() {
    const {value, data, childProps, className, sortableItemClassName, sortableItemDraggingClassName} = this.props;
    const order = (value.length > 0) ? value.split(',') : Object.keys(data);
    const orderedValues = order.map(key => data[key]);
    const listItems = orderedValues.map((item, idx) => {
      return (
          <SortableItem
            key={idx}
            index={idx}
            id={idx}
            text={item}
            moveCard={::this.moveCard}
            className={sortableItemClassName}
            classNameDragging={sortableItemDraggingClassName}
          />
      );
    });
    return (
      <ListGroup className={className}>{listItems}</ListGroup>
    );
  }
}

export default SortableList;
