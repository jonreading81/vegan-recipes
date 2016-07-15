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
import yieldsOptions from './data/yieldsOptions.json';
import timingOptions from './data/timingOptions.json';
import difficultyOptions from './data/difficultyOptions.json';

export const fields = [
  'title',
  'description',
  'author',
  'image',
  'difficulty',
  'sourceURL',
  'yields',
  'preperationTime',
  'cookingTime',
  'totalTime',
  'ingredients[].name',
  'ingredients[].quantity',
  'steps[]',
  'categories[]'
];

const CategoryList = ['Soup', 'Cake'];

class RecipeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {
        title,
        author,
        image,
        description,
        ingredients,
        steps,
        categories,
        difficulty,
        sourceURL,
        yields,
        preperationTime,
        cookingTime,
        totalTime
      },
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
            <ControlLabel>Image</ControlLabel>
            <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
          </FormGroup>

          <FormGroup controlId="description" type="text" field={description}>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter description" {...description}/>
          </FormGroup>

           <FormGroup controlId="difficulty" type="text" field={difficulty}>
            <ControlLabel>Difficulty</ControlLabel>
            <Select simpleValue placeholder="Select Difficulty" options={difficultyOptions} {...difficulty}/>
          </FormGroup>

          <FormGroup controlId="yields" type="text" field={yields}>
            <ControlLabel>Yields</ControlLabel>
            <Select simpleValue placeholder="Select Difficulty" options={yieldsOptions} {...yields}/>
          </FormGroup>

          <FormGroup controlId="sourceURL" type="text" field={sourceURL}>
            <ControlLabel>Source (URL)</ControlLabel>
            <FormControl type="text" placeholder="Enter Source" {...sourceURL}/>
          </FormGroup>
        </Panel>
        <Panel header="Timings">
           <FormGroup controlId="preperationTime" type="text" field={preperationTime}>
            <ControlLabel>Preperation Time</ControlLabel>
            <Select simpleValue placeholder="Select Preperation Time" options={timingOptions} {...preperationTime}/>
          </FormGroup>
           <FormGroup controlId="cookingTime" type="text" field={cookingTime}>
            <ControlLabel>Cooking Time</ControlLabel>
            <Select simpleValue placeholder="Select Cooking Time" options={timingOptions} {...cookingTime}/>
          </FormGroup>
           <FormGroup controlId="totalTime" type="text" field={totalTime}>
            <ControlLabel>Total Time</ControlLabel>
            <Select simpleValue placeholder="Select Total Time" options={timingOptions} {...totalTime}/>
          </FormGroup>
        </Panel>
        <Panel header="Categories">
        <MultiValueField field={categories} pluralName="categories" singularName="category" >
          <Autosuggest placeholder="Enter Category" suggestions={CategoryList}/>
        </MultiValueField>
        </Panel>
        <Panel header="Ingredients">
          <MultiValueField field={ingredients} pluralName="ingredients" singularName="ingredient" toolbarClass={styles.toolbar}>
            <IngredientInput/>
          </MultiValueField>
        </Panel>
        <Panel header="Steps">
        <MultiValueField field={steps} pluralName="steps" singularName="step" >
          <FormControl placeholder="Enter Step"/>
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
