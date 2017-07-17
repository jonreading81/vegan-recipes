import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {LoadingButton, SortableList} from 'components';
import ErrorBlock from 'components/Form/ErrorBlock';
import validation from './nameValidation';
import googleSurvey from 'hoc/GoogleSurvey';
import {ButtonToolbar} from 'react-bootstrap';
const validate = values => validation(values);


const fields = [
  'name'
];

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
      submitting,
      error,
      submitFn,
      success
    } = this.props;

    const data = {
      items: [
        'test',
        'test2',
        'test3'
      ]
    };

    // const styles = require('./Survey.scss');
    return (
              <div>
              <Helmet title="Survey"/>
              <HeroPanel image="butter.jpeg" title="Butta" subTitle="A replacement made from plants for spreading, cooking and baking" style="image-focus-bottom"/>
              <div className="container">
              <div className="column-medium">
              <If condition={!success}>
              <h2>Survey</h2>
              <p>Thank you for taking time to complete this questionnaire. Each survey is anonymous so please be completely honest about your opinions.</p>
              <form onSubmit={submitFn}>
              <fieldset>
               <SortableList data={data} />
                </fieldset>

                <ErrorBlock error={error}/>
                <ButtonToolbar>
                <LoadingButton type="submit" submitting={submitting} bsSize="large" bsStyle="primary">Submit</LoadingButton>
                </ButtonToolbar>
              </form>
            </If>
            <If condition={success}>
               <h2>Survey Submitted</h2>
               <h3>Thank you</h3>
               <blockquote>
               Nothing can be done alone and no one can take all the credit
               </blockquote>
            </If>
          </div>
        </div>
    </div>);
  }
}

export default googleSurvey(ButtaName, '19O7SYQdMnzlNdLZ9pNb8UIRiowWgRiqMP0u_rcRJGBk', fields, validate);
