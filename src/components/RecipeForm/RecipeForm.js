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
import yieldsOptions from 'data/yieldsOptions.json';
import timingOptions from 'data/timingOptions.json';
import difficultyOptions from 'data/difficultyOptions.json';
import { connect } from 'react-redux';
import get from 'lodash/get';

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
  'categories[]',
  'dietarySuitability[]'
];

@connect(
  (state) => {
    return {
      ingredientList: get(state.ingredients, 'items', []),
      quantityList: get(state.quantities, 'items', []),
      categoryList: get(state.categories, 'items', []),
      dietList: get(state.diets, 'items', [])
    };
  }
)
class RecipeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    ingredientList: PropTypes.array.isRequired,
    quantityList: PropTypes.array.isRequired,
    categoryList: PropTypes.array.isRequired,
    dietList: PropTypes.array.isRequired
  }

  render() {
    const {
      fields: {
        title,
        image,
        description,
        ingredients,
        steps,
        categories,
        dietarySuitability,
        difficulty,
        sourceURL,
        yields,
        preperationTime,
        cookingTime,
        totalTime
      },
      ingredientList,
      quantityList,
      categoryList,
      dietList,
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
            <Select simpleValue placeholder="Select Yields" options={yieldsOptions} {...yields}/>
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
        <Panel header="Ingredients">
          <MultiValueField field={ingredients} pluralName="ingredients" singularName="ingredient" toolbarClass={styles.toolbar}>
            <IngredientInput ingredientList={ingredientList} quantityList={quantityList} />
          </MultiValueField>
        </Panel>
        <Panel header="Steps">
        <MultiValueField field={steps} pluralName="steps" singularName="step" >
          <FormControl componentClass="textarea" placeholder="Enter Step"/>
        </MultiValueField>
        </Panel>
        <Panel header="Categories">
        <MultiValueField field={categories} pluralName="categories" singularName="category" >
          <Autosuggest placeholder="Enter Category" suggestions={categoryList}/>
        </MultiValueField>
        </Panel>
        <Panel header="Dietary Suitability">
        <MultiValueField field={dietarySuitability} pluralName="diets" singularName="diet" >
          <Autosuggest placeholder="Enter Diet" suggestions={dietList}/>
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
