import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {submit} from 'redux/modules/survey';
import get from 'lodash/get';

export default function(ComposedComponent, googleId, fields, initialValues = {}, validate) {
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
      const props = Object.assign({
        submitFn: (event) => handleSubmit(onSubmit)(event)
      }, this.props);

      return (<ComposedComponent {...props} />);
    }
  }

  const mapStateToProps = (state) => {
    return {
      submitting: get(state.survey, 'loading'),
      error: get(state.survey, 'loadError'),
      success: get(state.survey, 'success')
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onSubmit: (data) => {
        dispatch(submit(data, googleId));
      }
    };
  };

  return reduxForm({
    form: 'surveyForm',
    fields,
    validate,
    initialValues,
    returnRejectedSubmitPromise: true
  })(
    connect(mapStateToProps, mapDispatchToProps)(GoogleSurvey)
  );
}
