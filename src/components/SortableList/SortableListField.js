import React, {Component, PropTypes} from 'react';
import SortableList from './SortableList';

class SortableListField extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func
  };


  onChange(obj) {
    this.props.onChange(obj.items.join(','));
  }

  render() {
    const data = {
      items: this.props.value.split(',')
    };
    return (
      <SortableList className={this.props.className} onChange={this.onChange.bind(this)} data={data}/>
    );
  }
}

export default SortableListField;
