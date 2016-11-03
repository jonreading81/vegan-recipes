import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {HorizontalFormControl, LoadingButton} from 'components';
import {Button, ButtonToolbar, FormControl} from 'react-bootstrap';
import validation from './validation';
const validate = values => validation(values);
import Select from 'components/Form/Select';
import typeOptions from './typeOptions.json';

export const fields = [
  'title',
  'type',
  'URL',
  'description',
  'image'
];

class LinkForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {
        title,
        image,
        URL,
        description,
        type
      },
      handleSubmit,
      resetForm,
      loading,
      } = this.props;
    const styles = require('./LinkForm.scss');

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

         <FormGroup controlId="URL" type="text" field={URL}>
            <HorizontalFormControl label="URL" className={styles.formRow}>
               <FormControl type="text" placeholder="Enter URL" {...URL}/>
            </HorizontalFormControl>
        </FormGroup>

        <FormGroup controlId="description" type="text" field={description}>
            <HorizontalFormControl label="Description" className={styles.formRow}>
                <FormControl componentClass="textarea" placeholder="Enter Description" {...description}/>
             </HorizontalFormControl>
          </FormGroup>

          <FormGroup controlId="type" type="text" field={type}>
            <HorizontalFormControl label="Type" className={styles.formRow}>
                  <Select multi joinValues placeholder="Select Type" options={typeOptions} {...type}/>
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
  form: 'linkForm',
  fields,
  validate
})(LinkForm);
