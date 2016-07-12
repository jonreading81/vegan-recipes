import Autosuggest from 'Autosuggest';
import React, { Component, PropTypes } from 'react';

export default class CustomAutosuggest extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    suggestions: PropTypes.array
  };

  onSuggestionsUpdateRequested() {

  }

  onChange(event, { newValue }) {
    this.props.field.onChange(newValue);
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
    const { field, suggestions} = this.props;
    return (
        <Autosuggest suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={
            {
              ...field,
              onChange: ::this.onChange
            }
          }/>
    );
  }
}
