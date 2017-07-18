import React from 'react';
import {LoadingButton} from 'components';
import ErrorBlock from 'components/Form/ErrorBlock';
import {ButtonToolbar} from 'react-bootstrap';

function surveyFormFooter(props) {
  return (
    <div>
      <ErrorBlock error={props.error}/>
      <ButtonToolbar>
      <LoadingButton type="submit" submitting={props.submitting} bsSize="large" bsStyle="primary">Submit</LoadingButton>
      </ButtonToolbar>
    </div>
  );
}

export default surveyFormFooter;
