import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {HorizontalFormControl, LoadingButton} from 'components';
import {ButtonToolbar, FormControl} from 'react-bootstrap';
import validation from './validation';
const validate = values => validation(values);

export const fields = [
  'image',
  'name'
];

class ImageForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  render() {
    const {
      fields: {
        image,
        name
      },
      handleSubmit,
      loading,
      } = this.props;
    return (
      <form horizontal onSubmit={handleSubmit}>
        <h2>Upload Image</h2>

        <FormGroup controlId="name" type="text" field={name}>
          <HorizontalFormControl label="Name" >
            <FormControl type="text" placeholder="Enter Name" {...name}/>
          </HorizontalFormControl>
        </FormGroup>

        <FormGroup controlId="image" type="text" field={image}>
          <HorizontalFormControl label="Select Image" >
            <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
          </HorizontalFormControl>
        </FormGroup>

        <ButtonToolbar>
            <LoadingButton submitting={loading} type="submit" bsStyle="primary" bsSize="large" active>Submit</LoadingButton>
          </ButtonToolbar>
      </form>
    );
  }
}
export default reduxForm({
  form: 'imageForm',
  fields,
  validate
})(ImageForm);
