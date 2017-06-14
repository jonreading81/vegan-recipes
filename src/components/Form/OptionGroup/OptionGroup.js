import React, {Component, PropTypes} from 'react';
import OptionItemFacade from 'components/Form/OptionGroup/OptionItem/Facade';

class OptionGroup extends Component {

  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    multiValue: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    multiValue: false
  }

  constructor(props) {
    super(props);
    this.delimeterA = '/';
    this.delimeterB = ':';
  }

  onItemChanged(id, value) {
    const newValue = this.props.multiValue ? this.getMultiValueString(id, value) : this.getItemValueSting(id, value);
    this.props.onChange(newValue);
  }

  getItemValueSting(id, value) {
    if (!value) {
      return '';
    }
    let valueString = id;
    if (value !== true) {
      valueString = valueString + this.delimeterB + value;
    }
    return valueString;
  }

  getMultiValueString(id, value) {
    const objValues = this.getItemValuesFromValue(this.props.value);
    const arrValues = [];

    if (!value) {
      delete objValues[id];
    } else {
      objValues[id] = value;
    }

    for (const key in objValues) {
      if (objValues.hasOwnProperty(key)) {
        arrValues.push(this.getItemValueSting(key, objValues[key]));
      }
    }
    return arrValues.join(this.delimeterA);
  }

  getItemValuesFromValue(value = '') {
    const objValues = {};
    value.split(this.delimeterA).forEach((item) => {
      const arrItem = item.split(this.delimeterB);
      const index = arrItem[0];
      const val = (arrItem.length === 1) ? true : arrItem[1];
      objValues[index] = val;
    });
    return objValues;
  }

  render() {
    const {children} = this.props;
    const objValues = this.getItemValuesFromValue(this.props.value);
    const newChildren = React.Children.map(children, (child) => {
      return (
        <OptionItemFacade value={objValues[child.props.id]} id={child.props.id} onChange={this.onItemChanged.bind(this)}>{child}</OptionItemFacade>
      );
    });
    return (
      <div>{newChildren}</div>
    );
  }

}

export default OptionGroup;
