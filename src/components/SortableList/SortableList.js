import React, {Component, PropTypes} from 'react';
import { ListGroup } from 'react-bootstrap';
import SortableListItem from './SortableListItem';

class SortableList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
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

  updateState(obj) {
    this.setState(obj);
    if (obj.items && obj.items.length === Object.keys(this.dataKeys).length) {
      const orderedData = obj.items.map(item => this.dataKeys[this.getDataKey(item)]);
      this.props.onChange(orderedData.join(','));
    }
  }

  render() {
    const {value, data} = this.props;
    const className = (this.props.className) ? 'sortable-list ' + this.props.className : 'sortable-list';
    const order = (value.length > 0) ? value.split(',') : Object.keys(data);
    const orderedValues = order.map(val => data[val]);
    const listItems = orderedValues.map((item, idx) => {
      return (
        <SortableListItem
          key={idx}
          updateState={::this.updateState}
           items={orderedValues}
          draggingIndex={this.state.draggingIndex}
          sortId={idx}
          outline="list"
          >{item}</SortableListItem>
      );
    });
    return (
      <ListGroup className={className}>{listItems}</ListGroup>
    );
  }
}

export default SortableList;
