import Autosuggest from 'Autosuggest';
import React, { Component, PropTypes } from 'react';

export default class CustomAutosuggest extends Component {
  static propTypes = {
    suggestions: PropTypes.array
  };

  onSuggestionsUpdateRequested() {

  }

  onChange(event, { newValue }) {
    this.props.onChange(newValue);
  }

  getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    return suggestion;                 // what should be the value of the input
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }

  render() {
    require('./Autosuggest.less');
    const { value, suggestions} = this.props;
    return (
        <Autosuggest suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={
            {
              value: value,
              onChange: ::this.onChange
            }
          }/>
    );
  }
}
