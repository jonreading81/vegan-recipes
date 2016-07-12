import Select from 'react-select';
import React, { Component, PropTypes } from 'react';

export default class CustomSelect extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  };

  handleChange(value) {
    if (!value) return this.props.onChange(null);
    // if value has a value key, must wrap value and overwrite onChange because of
    // https://github.com/erikras/redux-form/blob/master/src/events/getValue.js#L37-L39
    return value.value ? this.props.onChange({ value }) : this.props.onChange(value);
  }

  handleBlur() {
    // https://github.com/JedWatson/react-select/issues/489
    const { value } = this.props;
    if (!value) return this.props.onBlur(null);
    return value.value ? this.props.onBlur({ value }) : this.props.onBlur(value);
  }

  render() {
    require('react-select/dist/react-select.css');
    const { value, onBlur, onChange, ...otherProps } = this.props;
    return (
        <Select
          // see https://github.com/JedWatson/react-select/issues/488
          value={value || ''}
          onChange={::this.handleChange}
          onBlur={::this.handleBlur}
          {...otherProps}
        />
    );
  }
}
