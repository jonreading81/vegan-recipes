import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'title', 'description', 'author', 'imageURL' ];
import FormGroup from 'components/Form/FormGroup';
import {Button, ButtonToolbar, FormControl, ControlLabel} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';
import validation from './validation';
const validate = values => validation(values);

class SimpleForm extends Component {
  render() {
    const {
      fields: { title, author, imageURL, description},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (<form onSubmit={handleSubmit}>
          <FormGroup controlId="title" type="text" field={title}>
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Enter title" {...title}/>
            <FormControl.Feedback />
            <HelpBlock field={title}/>
          </FormGroup>

          <FormGroup controlId="author" type="text" field={author}>
            <ControlLabel>Author</ControlLabel>
            <FormControl type="text" placeholder="Enter Author" {...author}/>
            <FormControl.Feedback />
            <HelpBlock field={author}/>
          </FormGroup>

          <FormGroup controlId="imageURL" type="text" field={imageURL}>
            <ControlLabel>ImageURL</ControlLabel>
            <FormControl type="text" placeholder="Enter ImageURL" {...imageURL}/>
            <FormControl.Feedback />
            <HelpBlock field={imageURL}/>
          </FormGroup>

          <FormGroup controlId="description" type="text" field={description}>
            <ControlLabel>description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter description" {...description}/>
            <FormControl.Feedback />
            <HelpBlock field={description}/>
          </FormGroup>
          <ButtonToolbar>
            <Button type="submit" disabled={submitting} bsStyle="primary" bsSize="large" active>Submit</Button>
            <Button type="button" bsSize="large" active disabled={submitting} onClick={resetForm} > Clear Values</Button>
          </ButtonToolbar>
      </form>
    );
  }
}

SimpleForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'simple',
  fields,
  validate
})(SimpleForm);
