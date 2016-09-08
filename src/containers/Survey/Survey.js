import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {HeroPanel, RadioGroup} from 'components';
import FormGroup from 'components/Form/FormGroup';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './validation';
import {LoadingButton} from 'components';
const validate = values => validation(values);
import {ControlLabel, Button, ButtonToolbar, FormControl} from 'react-bootstrap';
import {submit} from 'redux/modules/survey';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

const fields = [
  'questionA',
  'questionB',
  'questionC',
  'questionD',
  'questionE',
  'questionF',
  'questionG',
  'questionH',
  'questionI',
  'questionJ',
  'questionK',
  'questionL',
  'questionM',
  'questionN',
  'questionO',
  'questionP'
];
@connect(
  (state) => {
    return {
      submitting: get(state.survey, 'loading'),
      error: get(state.survey, 'loadError'),
      success: get(state.survey, 'success')
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(submit, dispatch)
    };
  }
)
class Survey extends Component {

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
      fields: {questionA, questionB, questionC, questionD, questionE, questionF, questionG, questionH, questionI, questionJ, questionK, questionL, questionM, questionN, questionO, questionP},
      handleSubmit,
      onSubmit,
      submitting,
      error,
      success
    } = this.props;

    const styles = require('./Survey.scss');

    return (
    <div>
      <Helmet title="Survey"/>
          <HeroPanel image="butter.jpeg" title="Butta" subTitle="A butter alternative" style="image-focus-bottom"/>
        <div className="container">
          <div className="column-medium">
            <If condition={!success}>
              <h2>Survey</h2>
              <p>Thank you for taking time to complete this questionnaire. Each survey is anonymous so please be completely honest about your opinions.</p>
              <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
               <legend>First, some questions about you</legend>
                <FormGroup className={styles.formGroup} controlId="questionA" type="text" field={questionA}>
                   <ControlLabel>What is your age group?</ControlLabel>
                    <RadioGroup {...questionA}>
                        <Button>1 - 20</Button>
                        <Button>21 - 35</Button>
                        <Button>36 - 50</Button>
                        <Button>50 and above</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionB" type="text" field={questionB}>
                   <ControlLabel>Which county in the UK do you live in?</ControlLabel>
                   <FormControl type="text" placeholder="For example, London" {...questionB}/>
                </FormGroup>
                </fieldset>
                <fieldset>
                <legend>Some questions about how you use butter or margarine at home</legend>
                <FormGroup className={styles.formGroup} controlId="questionC" type="text" field={questionC}>
                   <ControlLabel>Generally, do you use butter or margarine at home?</ControlLabel>
                    <RadioGroup {...questionC}>
                        <Button>Butter</Button>
                        <Button>Margarine</Button>
                        <Button>I use both</Button>
                        <Button>None of the above</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionD" type="text" field={questionD}>
                  <ControlLabel>Which do you prefer, butter or margarine?</ControlLabel>
                    <RadioGroup {...questionD}>
                        <Button>Butter</Button>
                        <Button>Margarine</Button>
                        <Button>It depends</Button>
                        <Button>I have no preference</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionE" type="text" field={questionE}>
                   <ControlLabel>What brands of butter or margarine do you usually buy?</ControlLabel>
                   <FormControl componentClass="textarea" placeholder="For example, Lurpak or Flora" {...questionE}/>
                </FormGroup>
                </fieldset>
                <fieldset>
                <legend>Some questions about Butta</legend>
                <FormGroup className={styles.formGroup} controlId="questionF" type="text" field={questionF}>
                  <ControlLabel>The ingredients of Butta are:<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Organic coconut oil<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Organic rapeseed oil<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Organic deodarised cocoa butter<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Organic soy milk<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Liquid soya lecithin<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Plant based lactic acid<br />
                  &nbsp;&nbsp;&nbsp;-&nbsp;Sea salt<br />
                  Would you be uncomfortable purchasing a butter alternative with any of these ingredients?</ControlLabel>
                    <RadioGroup {...questionF}>
                        <Button>Yes</Button>
                        <Button>No</Button>
                        <Button>I don't know</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionG" type="text" field={questionG}>
                   <ControlLabel>If you answered yes to the question above, please answer the following question, otherwise skip this one. <br />
                   Please list which ingredients you are uncomfortable with and why.</ControlLabel>
                   <FormControl componentClass="textarea" placeholder="For example, I am allergic to soya" {...questionG}/>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionH" type="text" field={questionH}>
                  <ControlLabel>Do you think there are any health benefits of using plant based butter or margarine?</ControlLabel>
                    <RadioGroup {...questionH}>
                        <Button>Yes</Button>
                        <Button>No</Button>
                        <Button>I don't know</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionI" type="text" field={questionI}>
                  <ControlLabel>Do you think there are any environmental benefits of using plant based butter or margarine?</ControlLabel>
                    <RadioGroup {...questionI}>
                        <Button>Yes</Button>
                        <Button>No</Button>
                        <Button>I don't know</Button>
                    </RadioGroup>
                </FormGroup>
                </fieldset>
                <fieldset>
                <legend>Some questions about your experience of Butta</legend>
                <FormGroup className={styles.formGroup} controlId="questionJ" type="text" field={questionJ}>
                  <ControlLabel>Did you manage to get Butta home without it spoiling?</ControlLabel>
                    <RadioGroup {...questionJ}>
                        <Button>Yes</Button>
                        <Button>No</Button>
                    </RadioGroup>
                </FormGroup>
                <p></p>
                <FormGroup className={styles.formGroup} controlId="questionK" type="text" field={questionK}>
                  <ControlLabel>Assuming that you did manage to get the sample home safely, please answer the following questions.  Otherwise, just submit the form using the button below.<br />
                  How did you taste test your sample of Butta?</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="For example, on toast" {...questionK}/>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionL" type="text" field={questionL}>
                  <ControlLabel>Rate your experience of using Butta as a substitute for what you traditionally use.</ControlLabel>
                  <p>Where 1 is 'Very good' and 5 is 'Very bad'</p>
                    <RadioGroup {...questionL} >
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>I dont know</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionM" type="text" field={questionM}>
                  <ControlLabel>Overall how much do you think Butta looks and feels like butter?</ControlLabel>
                  <p>Where 1 is 'It is extremely like butter' and 5 is 'It is not at all like butter'</p>
                    <RadioGroup {...questionM} >
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>I dont know</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionN" type="text" field={questionN}>
                  <ControlLabel>Overall how would you rate the taste of Butta compared to butter?</ControlLabel>
                  <p>Where 1 is 'The taste is better' and 5 is 'The taste is worse'</p>
                    <RadioGroup {...questionN} >
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>I dont know</Button>
                    </RadioGroup>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionO" type="text" field={questionO}>
                  <ControlLabel>Is there anything about the taste of Butta that you do not like?</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="For example, it was too salty" {...questionO}/>
                </FormGroup>
                <FormGroup className={styles.formGroup} controlId="questionP" type="text" field={questionP}>
                  <ControlLabel>Rate the overall quality of Butta.</ControlLabel>
                  <p>Where 1 is 'Very good' and 5 is 'Very bad'</p>
                    <RadioGroup {...questionP} >
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>I dont know</Button>
                    </RadioGroup>
                </FormGroup>
                </fieldset>
                <ErrorBlock error={error}/>

                <ButtonToolbar>
                <LoadingButton type="submit" submitting={submitting} bsSize="large" bsStyle="primary">Submit</LoadingButton>
                </ButtonToolbar>
              </form>
              <h3>Thank you</h3>
              <blockquote>
                  Nothing can be done alone and no one can take all the credit
              </blockquote>
            </If>
            <If condition={success}>
               <h2>Survey Submitted</h2>
                <div className="body-copy">
                  <p className="body-copy-first important">Thank you for completing the survey</p>
                </div>
            </If>
          </div>
        </div>
    </div>);
  }
}

export default reduxForm({
  form: 'surveyForm',
  fields,
  validate
})(Survey);

