import React, { Component, PropTypes } from 'react';
import {ButtonGroup} from 'react-bootstrap';

export default class RadioGroup extends Component {

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  updateValue(val) {
    this.props.onChange(val);
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      const childValue = child.props.children;
      return React.cloneElement(child, {
        onClick: this.updateValue.bind(this, childValue),
        active: (this.props.value === childValue)
      });
    });
  }
  render() {
    const { name, value} = this.props;
    return (
      <div>
        <ButtonGroup>{this.renderChildren()}</ButtonGroup>
        <input type="hidden" name={name} value={value} />
      </div>
    );
  }
}

