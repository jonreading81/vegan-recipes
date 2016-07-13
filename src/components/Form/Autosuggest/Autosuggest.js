import Autosuggest from 'react-autosuggest';
import React, { Component, PropTypes } from 'react';

export default class CustomAutosuggest extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    suggestions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      suggestions: []
    };
  }

  onSuggestionsUpdateRequested(value) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onChange(event, { newValue }) {
    this.props.onChange(newValue);
  }

  getSuggestions({ value }) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions = this.props.suggestions;

    return inputLength === 0 ? [] : suggestions.filter(suggestion =>
      suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }

  render() {
    const theme = require('./Autosuggest.less');
    const { value, onBlur, placeholder} = this.props;

    return (
        <Autosuggest suggestions={this.state.suggestions}
          onSuggestionsUpdateRequested={ ::this.onSuggestionsUpdateRequested}
          getSuggestionValue={ ::this.getSuggestionValue}
          renderSuggestion={ ::this.renderSuggestion}
          inputProps={
            {
              value: value,
              className: 'form-control',
              onChange: ::this.onChange,
              onBlur: onBlur,
              placeholder: placeholder
            }
          }
          theme={theme}
          />
    );
  }
}
