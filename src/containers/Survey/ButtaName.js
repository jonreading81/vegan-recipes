import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {SortableListField} from 'components';
import validation from './validation/name';
import googleSurvey from 'hoc/GoogleSurvey';
import SurveyHeader from './helpers/surveyHeader';
import SurveySuccess from './helpers/SurveySuccess';
import SurveyFormFooter from './helpers/SurveyFormFooter';
const validate = values => validation(values);

const fields = [
  'name'
];

const initalValues = {
  name: 'butta,better,amy'
};

class ButtaName extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    submitFn: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {name},
      submitting,
      error,
      submitFn,
      success
    } = this.props;

    // const styles = require('./Survey.scss');
    return (
              <div>
              <Helmet title="Survey"/>
              <SurveyHeader />
              <div className="container">
              <div className="column-medium">
              <If condition={!success}>
              <h2>Survey</h2>
              <p>Thank you for taking time to complete this questionnaire. Each survey is anonymous so please be completely honest about your opinions.</p>
              <form onSubmit={submitFn}>
              <fieldset>
               <SortableListField {...name} />
                </fieldset>
                <SurveyFormFooter submitting={submitting} error={error} />
              </form>
            </If>
            <If condition={success}>
               <SurveySuccess />
            </If>
          </div>
        </div>
    </div>);
  }
}

export default googleSurvey(ButtaName, '19O7SYQdMnzlNdLZ9pNb8UIRiowWgRiqMP0u_rcRJGBk', fields, initalValues, validate);
