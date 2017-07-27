
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {SortableList, PrefixValueInput} from 'components';
import validation from './validation/name';
import googleSurvey from 'hoc/GoogleSurvey';
import SurveyHeader from './helpers/surveyHeader';
import SurveySuccess from './helpers/SurveySuccess';
import SurveyFormFooter from './helpers/SurveyFormFooter';
const styles = require('./Survey.scss');
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
  'negativeWords6',
  'negativeWords7',
  'negativeWords8',
  'negativeWords9',
  'negativeWords10'
];
/* eslint-disable */
const nameChoices = {
  Aya: "Aya",
  Honest: "Honest",
  Betta: "Betta",
  Harmony: "Harmony",
  Lief: "Lief",
  Kind: "Kind",
  Earthly: "Earthly",
  Tula: "Tula",
  Satya: "Satya",
  Halo: "Halo"
};
const strapLinesChoices = {
  Aya: "Aya - Aya is an African goddess of forests, animals and herbal healing. Inspired by her, our spread uses only plant-sourced ingredients to protect the animals, and is far healthier for our own bodies too.",
  Honest: "Honest - We are an honest company whose core values compliment an ethical and sustainable lifestyle that prioritises nutritional health and the well-being of our planet and all its inhabitants.",
  Betta: "Betta - Tastes like butter, but spreads better. And dairy-free means it is also better for our animal friends, the environment and you. It's not butter, it's Betta!",
  Harmony: "Harmony - In harmony with earth and all its inhabitants we create healthy choices for the conscious consumer that compliments a sustainable and ethical lifestyle.",
  Lief: "Lief - The root word for 'love' in German, Dutch and Afrikaans, Lief (pronounced 'leaf') is plant-based, so promotes love for animals, for the environment and for you. Don’t just spread anything, spread the love!",
  Kind: "Kind - We are kind.  Kind to you, kind to animals, kind to our growers, kind to the earth.  In fact we're one of a kind",
  Earthly: "Earthly - We are Earthly because we are committed to providing you with the natural earthly goodness that supports a healthy you whilst holding our planet and all its inhabitants in the highest regard.",
  Tula: "Tula - The Zulu word for 'peace', our spread uses only plant-sourced ingredients to help quiet your mind in the knowledge that – while delicious to eat – Tula does absolutely no harm to animals, the planet, or you.",
  Satya: "Satya - Satya is Sanskrit for truth.  Our truth compliments an ethical and sustainable lifestyle that prioritises your nutritional health whilst tasting good too.",
  Halo: "Halo - How can something that tastes so heavenly, be this angelic?"
};
/* eslint-enable */


class ButtaName extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    submitFn: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }
  getPrefixValueField(name, field) {
    if (field) {
      return (
        <div className={styles.formGroup}>
          <h4>{name}</h4>
          <PrefixValueInput {...field} prefixValue={name} delimeter={':'} />
        </div>
      );
    }
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
              <p className={styles.intro}>Thank you for taking time to complete this questionnaire. Each survey is anonymous so please be completely honest about your opinions.</p>
              <form className={styles.form} onSubmit={submitFn}>
              <fieldset>
                <div className={styles.formGroupCollection}>
                  <h3>Order these names by preference:</h3>
                  <SortableList className="test" {...names} data={nameChoices} childProps={{className: styles.dragging}} className={styles.top5Large}/>
                </div>
                <div className={styles.formGroupCollection}>
                  <h3>Associated Words</h3>
                  <p>Please list any words you associate with the following names</p>
                  {this.getWordFields(topNames, 'associatedWords')}
                </div>
                <div className={styles.formGroupCollection}>
                  <h3>Order these Strap Lines by preference:</h3>
                  <SortableList {...straplines} data={strapLinesChoices} className={styles.top5}/>
                </div>
                <div className={styles.formGroupCollection}>
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
