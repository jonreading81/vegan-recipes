import React from 'react';
import {FormControl} from 'react-bootstrap';
import OptionItem from './OptionItem';

class CheckBoxOptionItem extends OptionItem {

  render() {
    const {children, onChange, value} = this.props;
    const newChildren = React.Children.map(children, (child) => {
      const id = child.props.children;
      const itemValue = this.props.valueStringHelper.getValueFromValueString(value, id);
      const newChild = React.cloneElement(child, {
        onChange: () => onChange(id, !itemValue),
        checked: itemValue
      });
      const className = (itemValue === false) ? 'hidden' : '';
      const explainValue = (itemValue === false || itemValue === true ) ? '' : itemValue;
      const placeholder = (child.props.explain === true ) ? 'Tell me more' : child.props.explain;

      return (
        <div>
          {newChild}
          <If condition={child.props.explain}>
             <FormControl
                className={className}
                componentClass="textarea"
                value={explainValue}
                placeholder={placeholder}
                onChange={(evt) => onChange(id, evt.target.value)}
              />
          </If>
        </div>
      );
    });
    return (
      <div>{newChildren}</div>
    );
  }
}

export default CheckBoxOptionItem;
