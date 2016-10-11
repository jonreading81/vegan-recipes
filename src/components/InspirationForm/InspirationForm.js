import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {HorizontalFormControl, LoadingButton} from 'components';
import {Button, ButtonToolbar, FormControl} from 'react-bootstrap';
import validation from './validation';
const validate = values => validation(values);
import Select from 'components/Form/Select';
import colorOptions from 'data/colorOptions.json';
// load theme styles with webpack

// ES module
import Editor from 'react-medium-editor';


export const fields = [
  'title',
  'color',
  'author',
  'image',
  'quote',
  'quoteAuthor'
];

class InspirationForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {
        color,
        title,
        image,
        quote,
        quoteAuthor
      },
      handleSubmit,
      resetForm,
      loading,
      } = this.props;
    const styles = require('./InspirationForm.scss');
    require('medium-editor/dist/css/medium-editor.css');
    require('medium-editor/dist/css/themes/default.css');
    return (
      <form horizontal onSubmit={handleSubmit}>

        <FormGroup className={styles.form} controlId="title" type="text" field={title}>
          <HorizontalFormControl label="Title" className={styles.formRow}>
            <FormControl type="text" placeholder="Enter Title" {...title}/>
          </HorizontalFormControl>
        </FormGroup>
        <FormGroup controlId="image" type="text" field={image}>
          <HorizontalFormControl label="Select Image" className={styles.formRow}>
            <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
          </HorizontalFormControl>
        </FormGroup>

        <FormGroup controlId="color" type="text" field={color}>
          <HorizontalFormControl label="Color" className={styles.formRow}>
            <Select simpleValue placeholder="Select Colour" options={colorOptions} {...color}/>
          </HorizontalFormControl>
        </FormGroup>

         <FormGroup controlId="quote" type="text" field={quote}>
            <HorizontalFormControl label="Quote" className={styles.formRow}>
              <Editor
                options={{placeholder: 'Enter Quote', mode: Editor.rich, toolbar: {buttons: ['bold', 'italic', 'underline']}}}
                text={quote.value} onChange={quote.onChange}/>
            </HorizontalFormControl>
        </FormGroup>

        <FormGroup controlId="author" type="text" field={quoteAuthor}>
          <HorizontalFormControl label="Author" className={styles.formRow}>
            <FormControl type="text" placeholder="Enter Author" {...quoteAuthor}/>
          </HorizontalFormControl>
         </FormGroup>

          <ButtonToolbar>
            <LoadingButton submitting={loading} type="submit" bsStyle="primary" bsSize="large" active>Submit</LoadingButton>
            <Button type="button" bsSize="large" active disabled={loading} onClick={resetForm} >Reset</Button>
          </ButtonToolbar>
      </form>
    );
  }
}
export default reduxForm({
  form: 'inspirationForm',
  fields,
  validate
})(InspirationForm);
