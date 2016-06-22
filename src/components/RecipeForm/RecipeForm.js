import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'title', 'description', 'author', 'imageURL' ];
import FormGroup from 'components/Form/FormGroup';
import validation from './validation';
const validate = values => validation(values);

class SimpleForm extends Component {
  render() {
    const {
      fields: { title, description, author, imageURL},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (<form onSubmit={handleSubmit}>
        <div>
          <FormGroup controlId="title" label="Title" type="text" field={title}/>
        </div>
        <div>
          <label>Author</label>
          <div>
           <FormGroup controlId="author" label="Author" type="text" field={author}/>
      </div>
        </div>
        <div>
          <label>ImageURL</label>
          <div>
            <FormGroup controlId="imageURL" label="imageURL" type="text" field={imageURL}/>
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
            <textarea
              {...description}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={description.value || ''}/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
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
