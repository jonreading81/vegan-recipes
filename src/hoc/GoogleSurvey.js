import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {submit} from 'redux/modules/survey';
import get from 'lodash/get';

export default function(ComposedComponent, googleId, fields, validate) {
  class GoogleSurvey extends Component {
    static propTypes = {
      fields: PropTypes.object.isRequired,
      error: PropTypes.object,
      success: PropTypes.bool,
      handleSubmit: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired
    }

    render() {
      const {
        handleSubmit,
        onSubmit,
      } = this.props;

      const submitFn = (event) => handleSubmit(onSubmit)(event)
        .catch(err => {
          let errorField;
          for (errorField in err) {
            if (err.hasOwnProperty(errorField)) {
              document.getElementById(errorField).focus();
              break;
            }
          }
        }
      );

      const props = Object.assign({
        submitFn: submitFn
      }, this.props);

      return (<ComposedComponent {...props} />);
    }
  }

  const mapStateTopProps = (state) => {
    return {
      submitting: get(state.survey, 'loading'),
      error: get(state.survey, 'loadError'),
      success: get(state.survey, 'success')
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onSubmit: (data) => {
        console.log(data);
        dispatch(submit(data, googleId));
      }
    };
  };

  return reduxForm({
    form: 'surveyForm',
    fields,
    validate,
    returnRejectedSubmitPromise: true
  })(
    connect(mapStateTopProps, mapDispatchToProps)(GoogleSurvey)
  );
}
