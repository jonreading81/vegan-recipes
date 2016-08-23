import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import {MultiValueField, MultiValueFormControlWrapper, HorizontalFormControl} from 'components';
import {Button, ButtonToolbar, FormControl} from 'react-bootstrap';
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
  'shortDescription',
  'description',
  'author',
  'image',
  'difficulty',
  'sourceURL',
  'yields',
  'preperationTime',
  'cookingTime',
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
        shortDescription,
        description,
        ingredients,
        steps,
        categories,
        dietarySuitability,
        difficulty,
        sourceURL,
        yields,
        preperationTime,
        cookingTime
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

    return (
      <form horizontal className={styles.form} onSubmit={handleSubmit}>
       <h2>Recipe Details:</h2>
          <FormGroup controlId="title" type="text" field={title}>
            <HorizontalFormControl label="Title" className={styles.formRow}>
              <FormControl type="text" placeholder="Enter Title" {...title}/>
            </HorizontalFormControl>
          </FormGroup>
          <FormGroup controlId="image" type="text" field={image}>
            <HorizontalFormControl label="Select Image" className={styles.formRow}>
              <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
            </HorizontalFormControl>
          </FormGroup>

           <FormGroup controlId="shortDescription" type="text" field={shortDescription}>
              <HorizontalFormControl label="Short Description" className={styles.formRow}>
                <FormControl componentClass="textarea" placeholder="Enter Short Description" {...shortDescription}/>
              </HorizontalFormControl>
          </FormGroup>

           <FormGroup controlId="description" type="text" field={description}>
            <HorizontalFormControl label="Description" className={styles.formRow}>
                <FormControl componentClass="textarea" placeholder="Enter Description" {...description}/>
             </HorizontalFormControl>
          </FormGroup>

           <FormGroup controlId="difficulty" type="text" field={difficulty}>
            <HorizontalFormControl label="Difficulty" className={styles.formRow}>
                  <Select simpleValue placeholder="Select Difficulty" options={difficultyOptions} {...difficulty}/>
            </HorizontalFormControl>
          </FormGroup>

          <FormGroup controlId="yields" type="text" field={yields}>
            <HorizontalFormControl label="Serves" className={styles.formRow}>
              <Select simpleValue placeholder="Select Servers" options={yieldsOptions} {...yields}/>
           </HorizontalFormControl>
          </FormGroup>

          <FormGroup controlId="sourceURL" type="text" field={sourceURL}>
            <HorizontalFormControl label="Source (URL)" className={styles.formRow}>
              <FormControl type="text" placeholder="Enter Source" {...sourceURL}/>
            </HorizontalFormControl>
           </FormGroup>
         <h2>Timings:</h2>
           <FormGroup controlId="preperationTime" type="text" field={preperationTime}>
            <HorizontalFormControl label="Preperation Time" className={styles.formRow}>
              <Select simpleValue placeholder="Select Preperation Time" options={timingOptions} {...preperationTime}/>
            </HorizontalFormControl>
          </FormGroup>
           <FormGroup controlId="cookingTime" type="text" field={cookingTime}>
            <HorizontalFormControl label="Cooking Time" className={styles.formRow}>
              <Select simpleValue placeholder="Select Cooking Time" options={timingOptions} {...cookingTime}/>
            </HorizontalFormControl>
          </FormGroup>
          <h2>Ingredients:</h2>
          <MultiValueField field={ingredients} pluralName="ingredients" singularName="ingredient" toolbarClass={styles.toolbar}>
            <IngredientInput ingredientList={ingredientList} quantityList={quantityList} />
          </MultiValueField>
        <h2>Method:</h2>
        <MultiValueField field={steps} pluralName="steps" singularName="step" >
          <MultiValueFormControlWrapper id="step">
            <FormControl componentClass="textarea" placeholder="Enter Step"/>
          </MultiValueFormControlWrapper>
        </MultiValueField>
        <h2>Categories:</h2>
        <MultiValueField field={categories} pluralName="categories" singularName="category" >
          <MultiValueFormControlWrapper id="category">
            <Autosuggest placeholder="Enter Category" suggestions={categoryList}/>
          </MultiValueFormControlWrapper>
        </MultiValueField>
        <h2>Dietary Suitability:</h2>
        <MultiValueField field={dietarySuitability} pluralName="diets" singularName="diet" >
          <MultiValueFormControlWrapper id="diet">
            <Autosuggest placeholder="Enter Diet" suggestions={dietList}/>
          </MultiValueFormControlWrapper>
        </MultiValueField>
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
