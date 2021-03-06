import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {RadioGroup} from 'components';
import FormGroup from 'components/Form/FormGroup';
import validation from './validation/survey';
import googleSurvey from 'hoc/GoogleSurvey';
import SurveyHeader from './helpers/SurveyHeader';
import SurveySuccess from './helpers/SurveySuccess';
import SurveyFormFooter from './helpers/SurveyFormFooter';
import {ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
const validate = values => validation(values);


const fields = [
  'question1',
  'question2',
  'question3',
  'question4',
  'question5',
  'question6',
  'question7',
  'question8',
  'question9',
  'question10',
  'question11',
  'question12',
  'question13'
];

class Survey extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.object,
    success: PropTypes.bool,
    submitFn: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13},
      submitting,
      error,
      submitFn,
      success
    } = this.props;

    const styles = require('./Survey.scss');
    return (
              <div>
              <Helmet title="Survey"/>
              <SurveyHeader />
              <div className="container">
              <div className="column-medium">
              <If condition={!success}>
              <h2>Survey</h2>
              <p className={styles.intro}>Thank you for taking time to complete this questionnaire. Each survey is anonymous so please be completely honest about your opinions.</p>
              <form onSubmit={submitFn}>
              <fieldset>
               <legend></legend>
               <FormGroup className={styles.formGroup} controlId="question1" type="text" field={question1}>
                   <ControlLabel>What is your sex?</ControlLabel>
                    <RadioGroup {...question1}>
                        <input type="radio" id="question1" name="question1">Female</input>
                        <input type="radio" name="question1">Male</input>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question2" type="text" field={question2}>
                   <ControlLabel>What is your age group?</ControlLabel>
                    <RadioGroup {...question2}>
                        <input type="radio" id="question2" name="question2">18 - 34</input>
                        <input type="radio" name="question2">35 - 44</input>
                        <input type="radio" name="question2">45 - 54</input>
                        <input type="radio" name="question2">55 and above</input>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question3" type="text" field={question3}>
                   <ControlLabel>Where do you live?</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="I live in ..." {...question3}/>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question4" type="text" field={question4}>
                   <ControlLabel>What is your occupation?</ControlLabel>
                   <FormControl componentClass="textarea" placeholder="My occupation is ..." {...question4}/>
                </FormGroup>
            	<FormGroup className={styles.formGroup} controlId="question5" type="text" field={question5}>
                   <ControlLabel>Do you have any dietary preferences or allergies?</ControlLabel>
                    <RadioGroup {...question5}>
                        <Checkbox id="question5">Vegetarian</Checkbox>
                        <Checkbox>Vegan</Checkbox>
                        <Checkbox>Gluten free</Checkbox>
                        <Checkbox>Lactose intolerant</Checkbox>
                        <Checkbox>Soy allergy</Checkbox>
                        <Checkbox>Nut allergy</Checkbox>
                        <Checkbox>Other, please detail below</Checkbox>
                        <FormControl componentClass="textarea" placeholder="Other dietary preferences or allergies" />
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question6" type="text" field={question6}>
                  <ControlLabel>Generally, do you do your own food shopping?</ControlLabel>
                    <RadioGroup {...question6}>
                        <input type="radio" id="question6" name="question6">Yes</input>
                        <input type="radio" name="question6">No</input>
                        <input type="radio" name="question6">It is split between my partner and I</input>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question7" type="text" field={question7}>
                   <ControlLabel>Generally do you buy butter or margarine?</ControlLabel>
                   <RadioGroup {...question7}>
                        <input type="radio" id="question7" name="question7">Butter</input>
                        <input type="radio" name="question7">Margarine</input>
                        <input type="radio" name="question7">Both</input>
                        <input type="radio" name="question7">None</input>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question8" type="text" field={question8}>
                   <ControlLabel>Do you use plant oil as a replacement for butter or margarine?</ControlLabel>
                   <RadioGroup {...question8}>
                        <input type="radio" id="question8" name="question8">Always</input>
                        <input type="radio" name="question8">Sometimes</input>
                        <input type="radio" name="question8">Never</input>
                    </RadioGroup>
                </FormGroup>
            </fieldset>
            <fieldset>
                <legend>What do you generally prefer for?</legend>
                <FormGroup className={styles.formGroup} controlId="question9" type="text" field={question9}>
                   <ControlLabel>Spreading on bread or toast</ControlLabel>
                   <RadioGroup {...question9}>
                        <Checkbox id="question9">I dont spread</Checkbox>
                        <Checkbox>Butter</Checkbox>
                        <Checkbox>Margarine</Checkbox>
                        <Checkbox>Oil, please state your preference</Checkbox>
                        <FormControl componentClass="textarea" placeholder="The oil I prefer is ..." />
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question10" type="text" field={question10}>
                   <ControlLabel>Cooking</ControlLabel>
                   <RadioGroup {...question10}>
                        <Checkbox id="question10">I dont cook</Checkbox>
                        <Checkbox>Butter</Checkbox>
                        <Checkbox>Margarine</Checkbox>
                        <Checkbox>Oil, please state your preference</Checkbox>
                        <FormControl componentClass="textarea" placeholder="The oil I prefer is ..." />
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question11" type="text" field={question11}>
                   <ControlLabel>Melting on vegetables</ControlLabel>
                   <RadioGroup {...question11}>
                        <Checkbox id="question11">I dont melt on veges</Checkbox>
                        <Checkbox>Butter</Checkbox>
                        <Checkbox>Margarine</Checkbox>
                        <Checkbox>Oil, please state your preference</Checkbox>
                        <FormControl componentClass="textarea" placeholder="The oil I prefer is ..." />
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="question12" type="text" field={question12}>
                   <ControlLabel>Baking</ControlLabel>
                   <RadioGroup {...question12}>
                        <Checkbox id="question12">I dont bake</Checkbox>
                        <Checkbox>Butter</Checkbox>
                        <Checkbox>Margarine</Checkbox>
                        <Checkbox>Oil, please state your preference</Checkbox>
                        <FormControl componentClass="textarea" placeholder="The oil I prefer is ..." />
                    </RadioGroup>
                </FormGroup>
                </fieldset>
                <fieldset>
                <legend>Please answer true, false or I dont know to the following questions</legend>
                <FormGroup className={styles.formGroup} controlId="question13" type="text" field={question13}>
                  <ControlLabel>Butter is generally higher in fat than margarine?</ControlLabel>
                  <RadioGroup {...question13}>
                   		<input type="radio" id="question13" name="question13">True</input>
                        <input type="radio" name="question13">False</input>
                        <input type="radio" name="question13">Niether</input>
                        <input type="radio" name="question13">I dont know</input>
                    </RadioGroup>
                </FormGroup>
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

export default googleSurvey(Survey, '1CpGwyOkyYG1aCEowexoPtOOwbzxXoOqDblp00ZSkNjc', fields, {}, validate);
