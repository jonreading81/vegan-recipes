import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {MultiValueField} from 'components';
import {Button, ButtonToolbar, FormControl, ControlLabel, Panel} from 'react-bootstrap';
import validation from './validation';
import IngredientInput from './IngredientInput';
const validate = values => validation(values);
import Select from 'components/Form/Select';
import Autosuggest from 'components/Form/Autosuggest/Autosuggest';

export const fields = [
  'title',
  'description',
  'author',
  'image',
  'ingredients[].name',
  'ingredients[].quantity',
  'steps[]',
  'categories'
];

const FLAVOURS = [
      { label: 'Chocolate', value: 'chocolate'},
      { label: 'Vanilla', value: 'vanilla'}
];

const SUGGESTIONS = ['one', 'two'];

class RecipeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: { title, author, image, description, ingredients, steps, categories},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    const styles = require('./RecipeForm.scss');

    return (<form onSubmit={handleSubmit}>

        <Panel header="Recipe Details">
          <FormGroup controlId="title" type="text" field={title}>
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Enter Title" {...title}/>
          </FormGroup>
          <FormGroup controlId="author" type="text" field={author}>
            <ControlLabel>Author</ControlLabel>
            <FormControl type="text" placeholder="Enter Author" {...author}/>
          </FormGroup>

          <FormGroup controlId="image" type="text" field={image}>
            <ControlLabel>image</ControlLabel>
            <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
          </FormGroup>

          <FormGroup controlId="description" type="text" field={description}>
            <ControlLabel>description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter description" {...description}/>
          </FormGroup>
          <FormGroup controlId="categories" type="text" field={categories}>
            <ControlLabel>Categories</ControlLabel>
            <Select multi simpleValue {...categories} placeholder="Select Categories" options={FLAVOURS} />
          </FormGroup>
        </Panel>
        <Panel header="Ingredients">
          <MultiValueField field={ingredients} pluralName="ingredients" singularName="ingredient" toolbarClass={styles.toolbar}>
            <IngredientInput/>
          </MultiValueField>
        </Panel>
        <Panel header="Steps">
        <MultiValueField field={steps} pluralName="steps" singularName="step" >
          <Autosuggest placeholder="Enter Step" suggestions={SUGGESTIONS} />
        </MultiValueField>
        </Panel>
        <ButtonToolbar>
            <Button type="submit" disabled={submitting} bsStyle="primary" bsSize="large" active>Submit</Button>
            <Button type="button" bsSize="large" active disabled={submitting} onClick={resetForm} >Reset</Button>
          </ButtonToolbar>
      </form>
    );
  }
}
export default reduxForm({
  form: 'recipeForm',
  fields,
  validate
})(RecipeForm);
