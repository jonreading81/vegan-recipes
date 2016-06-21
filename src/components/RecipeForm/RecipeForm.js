import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'title', 'description', 'author', 'imageURL' ];

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  return errors;
};

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
          <label>Title</label>
          <div>
            <input type="text" placeholder="Title" {...title}/>
                {title.touched && title.error && <div>{title.error}</div>}
          </div>
        </div>
        <div>
          <label>Author</label>
          <div>
            <input type="text" placeholder="Author" {...author}/>
          </div>
        </div>
        <div>
          <label>ImageURL</label>
          <div>
            <input type="text" placeholder="ImageURL" {...imageURL}/>
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
