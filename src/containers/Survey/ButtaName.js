import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {SortableList, PrefixValueInput} from 'components';
import validation from './validation/name';
import googleSurvey from 'hoc/GoogleSurvey';
import SurveyHeader from './helpers/surveyHeader';
import SurveySuccess from './helpers/SurveySuccess';
import SurveyFormFooter from './helpers/SurveyFormFooter';
const validate = values => validation(values);

const fields = [
  'names',
  'associatedWords1',
  'associatedWords2',
  'associatedWords3',
  'associatedWords4',
  'associatedWords5',
  'straplines',
  'negativeWords1',
  'negativeWords2',
  'negativeWords3',
  'negativeWords4',
  'negativeWords5',
  'negativeWords6'
];

const nameChoices = {
  amy: 'Amy',
  jon: 'Jon',
  aya: 'Aya',
  butta: 'Butta',
  betta: 'Betta',
  satya: 'Satya'
};

const strapLinesChoices = {
  amy: 'Amy Text',
  jon: 'Jon Text',
  aya: 'Aya  Text',
  butta: 'Butta Text',
  betta: 'Betta Text',
  satya: 'Satya Text'
};

class ButtaName extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    submitFn: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }
  getPrefixValueField(name, field) {
    return (
      <div>
        <h4>{name}</h4>
        <PrefixValueInput {...field} prefixValue={name} delimeter={':'} />
      </div>
    );
  }

  getWordFields(arrValues, fieldType) {
    return arrValues.map((_name, idx) => this.getPrefixValueField(_name, this.props.fields[fieldType + (idx + 1)]));
  }

  render() {
    const {
      fields: {names, straplines},
      submitting,
      error,
      submitFn,
      success
    } = this.props;

    const styles = require('./Survey.scss');
    const allNames = names.value.split(',');
    const topNames = allNames.slice(0, 5);

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
                <div className={styles.formGroup}>
                  <h3>Order these names by preference:</h3>
                  <SortableList {...names} data={nameChoices} className={styles.top5}/>
                </div>
                <div className={styles.formGroup}>
                  <h3>Associated Words</h3>
                  <p>Please list any words you associate with the following names</p>
                  {this.getWordFields(topNames, 'associatedWords')}
                </div>
                <div className={styles.formGroup}>
                  <h3>Order these Strap Lines by preference:</h3>
                  <SortableList {...straplines} data={strapLinesChoices} className={styles.top5}/>
                </div>
                <div className={styles.formGroup}>
                  <h3>Negative Words</h3>
                  <p>Please list any words you negatively associate with the following names</p>
                  {this.getWordFields(allNames, 'negativeWords')}
                </div>
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

export default googleSurvey(ButtaName, '19O7SYQdMnzlNdLZ9pNb8UIRiowWgRiqMP0u_rcRJGBk', fields, {}, validate);
