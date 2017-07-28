import React from 'react';
import OptionItem from './OptionItem';

class RadioOptionItem extends OptionItem {

  render() {
    const {children, onChange, value} = this.props;
    const newChildren = React.Children.map(children, (child) => {
      const id = child.props.children;
      const itemValue = this.props.valueStringHelper.getValueFromValueString(value, id);
      return React.cloneElement(child, {
        onChange: () => onChange(id, !itemValue),
        checked: itemValue
      });
    });
    return (
      <div>{newChildren}</div>
    );
  }
}

export default RadioOptionItem;


