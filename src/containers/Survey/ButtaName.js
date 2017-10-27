
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {SortableList, PrefixValueInput} from 'components';
import validation from './validation/name';
import googleSurvey from 'hoc/GoogleSurvey';
import SurveyHeader from './helpers/SurveyHeader';
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
  Aya: "<p><strong>Aya</strong> - Aya is an African goddess of forests, animals and herbal healing. Inspired by her, our spread uses only plant-sourced ingredients to protect the animals, and is far healthier for our own bodies too.</p>",
  Honest: "<p><strong>Honest</strong> - We are an honest company whose core values compliment an ethical and sustainable lifestyle that prioritises nutritional health and the well-being of our planet and all its inhabitants.</p>",
  Betta: "<p><strong>Betta</strong> - Tastes like butter, but spreads better. And dairy-free means it is also better for our animal friends, the environment and you. It's not butter, it's Betta!</p>",
  Harmony: "<p><strong>Harmony</strong> - In harmony with earth and all its inhabitants we create healthy choices for the conscious consumer that compliments a sustainable and ethical lifestyle.</p>",
  Lief: "<p><strong>Lief</strong> - The root word for 'love' in German, Dutch and Afrikaans, Lief (pronounced 'leaf') is plant-based, so promotes love for animals, for the environment and for you. Don’t just spread anything, spread the love!</p>",
  Kind: "<p><strong>Kind</strong> - We are kind.  Kind to you, kind to animals, kind to our growers, kind to the earth.  In fact we're one of a kind</p>",
  Earthly: "<p><strong>Earthly</strong> - We are Earthly because we are committed to providing you with the natural earthly goodness that supports a healthy you whilst holding our planet and all its inhabitants in the highest regard.</p>",
  Tula: "<p><strong>Tula</strong> - The Zulu word for 'peace', our spread uses only plant-sourced ingredients to help quiet your mind in the knowledge that – while delicious to eat – Tula does absolutely no harm to animals, the planet, or you.</p>",
  Satya: "<p><strong>Satya</strong> - Satya is Sanskrit for truth.  Our truth compliments an ethical and sustainable lifestyle that prioritises your nutritional health whilst tasting good too.</p>",
  Halo: "<p><strong>Halo</strong> - How can something that tastes so heavenly, be this angelic?</p>"
};

const namesValueString= Object.keys(nameChoices).join(',');

const initalValues = {
  names: namesValueString,
  straplines: namesValueString
}
/* eslint-enable */

class ButtaName extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    submitFn: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }
  getPrefixValueField(name, field, placeholder) {
    if (field) {
      return (
        <div className={styles.formGroup}>
          <h4>{name}</h4>
          <PrefixValueInput {...field} placeholder={placeholder} prefixValue={name} delimeter={':'} />
        </div>
      );
    }
  }

  getWordFields(arrValues, fieldType, placeholder) {
    return arrValues.map((_name, idx) => this.getPrefixValueField(_name, this.props.fields[fieldType + (idx + 1)], placeholder));
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
              <p className={styles.intro}>We need your help in choosing a name for our plant-based butter (which can’t be called butter because it contains no milk solids).
                Please complete the questions below and let us know which names you prefer, we’re looking for your top 5.  Also,
                if you can assist us by giving us some associated words that come to mind we would be most grateful.
                <br /> <br />
                It’s over to you then...
              </p>
              <form className={styles.form} onSubmit={submitFn}>
              <fieldset>
                <div className={styles.formGroupCollection}>
                  <h3 tabIndex="0">Drag & Drop these names by preference:</h3>
                  <SortableList className={styles.sortableItemContainer} {...names} data={nameChoices} sortableItemClassName={styles.sortableItemLarge} sortableItemDraggingClassName={styles.sortableItemDragging}/>
                </div>
                <div className={styles.formGroupCollection}>
                  <h3>Associated Words:</h3>
                  <p>Please list any words you associate with the following names.</p>
                  {this.getWordFields(topNames, 'associatedWords', 'Type associated words here')}
                </div>
                <div className={styles.formGroupCollection}>
                  <h3 tabIndex="0">Drag & Drop these Strap Lines by preference:</h3>
                  <SortableList {...straplines} data={strapLinesChoices} className={styles.sortableItemContainer} sortableItemClassName={styles.sortableItem} sortableItemDraggingClassName={styles.sortableItemDragging}/>
                </div>
                <div className={styles.formGroupCollection}>
                  <h3>Negative Words:</h3>
                  <p>Please list any words you negatively associate with the following names.</p>
                  {this.getWordFields(allNames, 'negativeWords', 'Type any negative words here')}
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

export default googleSurvey(ButtaName, '19O7SYQdMnzlNdLZ9pNb8UIRiowWgRiqMP0u_rcRJGBk', fields, initalValues, validate);
