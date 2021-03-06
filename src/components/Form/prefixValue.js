import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';

class PrefixValue extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    prefixValue: PropTypes.string.isRequired,
    delimeter: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  onInputChange(event) {
    const value = [this.props.prefixValue, this.props.delimeter, event.target.value].join('');
    this.props.onChange(value);
  }

  render() {
    let {value} = this.props;
    const {delimeter, prefixValue} = this.props;
    value = value.replace(prefixValue, '');
    value = value.replace(delimeter, '');
    const props = Object.assign({}, this.props, {
      onChange: ::this.onInputChange,
      onBlur: ::this.onInputChange,
      value: value
    });
    return (
      <div className="prefix-value-field">
        <FormControl {...props}/>
      </div>
    );
  }
}
export default PrefixValue;
