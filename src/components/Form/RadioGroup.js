import React, { Component, PropTypes } from 'react';
import {ButtonGroup, FormControl} from 'react-bootstrap';
import includes from 'lodash/includes';

const DELIMETER = '/';

export default class RadioGroup extends Component {

  static propTypes = {
    name: PropTypes.string,
    multi: PropTypes.bool,
    otherOption: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  }


  updateValue(val) {
    this.props.onChange(val);
  }

  renderChildren() {
    const values = this.props.value .split(DELIMETER);
    const children = React.Children.map(this.props.children, (child, id) => {
      const childValue = child.props.children;
      return React.cloneElement(child, {
        onClick: () => this.updateValue(childValue),
        checked: includes(values, childValue),
        ref: id,
        active: includes(values, childValue)
      });
    });

    return children;
  }
  render() {
    const { name, value, otherOption} = this.props;
    // console.log('other', otherOption);
    return (
      <div>
        <ButtonGroup>{this.renderChildren()}</ButtonGroup>
        <input type="hidden" name={name} value={value} />
        <If condition={otherOption}>
          <FormControl onChange={(evt) => this.updateValue(evt.target.value)} componentClass="textarea" placeholder="Other" />
        </If>
      </div>
    );
  }
}

