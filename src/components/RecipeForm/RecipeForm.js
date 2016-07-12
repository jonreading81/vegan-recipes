import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import MultiValueFieldActions from 'components/Form/MultiValueFieldActions';
import {MultiValueField} from 'components';
import MultiValueFieldAddButton from 'components/Form/MultiValueFieldAddButton';
import {Button, ButtonToolbar, FormControl, ControlLabel, Col, Row, Panel} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';
import validation from './validation';
const validate = values => validation(values);
import Select from 'components/Form/Select';
// import get from 'lodash/get';

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

    // selectHelper.getOptionsForField('category',['chocolate,vanilla']);
    // selectHelper.addPropsToValuesForField('category',categories);

    const FLAVOURS = [
      { label: 'Chocolate', value: 'chocolate'},
      { label: 'Vanilla', value: 'vanilla'}
    ];
    /*
    console.log(categories.value);
    if(categories.value){
      categories.value.map((cat) => {
        cat.label = cat.category;
        cat.id = cat.category;
      });
    }
    */
    return (<form onSubmit={handleSubmit}>

        <Panel header="Recipe Details">
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

          <FormGroup controlId="image" type="text" field={image}>
            <ControlLabel>image</ControlLabel>
            <FormControl type="file" placeholder="Enter image" {...image} value={ null }/>
            <FormControl.Feedback />
            <HelpBlock field={image}/>
          </FormGroup>

          <FormGroup controlId="description" type="text" field={description}>
            <ControlLabel>description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter description" {...description}/>
            <FormControl.Feedback />
            <HelpBlock field={description}/>
          </FormGroup>
          <FormGroup controlId="categories" type="text" field={categories}>
            <ControlLabel>Categories</ControlLabel>
            <Select multi simpleValue {...categories} placeholder="Select Categories" options={FLAVOURS} />
          </FormGroup>
        </Panel>
        <Panel header="Ingredients">
        {!ingredients.length && <div>No ingredients</div>}
        <MultiValueFieldAddButton field={ingredients} title="Add Ingredient"/>
        {ingredients.map((ingredient, index) =>
          <div key={index} >
            <h4>Ingredient #{index + 1}</h4>
            <Row>
            <Col xs={12} md={4}>
            <FormGroup controlId={'ingedient-' + (index + 1) + 'name'} type="text" field={ingredient.name}>
              <ControlLabel>Name</ControlLabel>
              <FormControl type="input" placeholder="Enter Name" {...ingredient.name}/>
              <FormControl.Feedback />
              <HelpBlock field={ingredient.name}/>
            </FormGroup>
            </Col>
            <Col xs={12} md={4}>
             <FormGroup controlId={'ingedient-' + (index + 1) + 'quanity'} type="text" field={ingredient.quantity}>
              <ControlLabel>Quantity</ControlLabel>
              <FormControl type="input" placeholder="Enter Quantity" {...ingredient.quantity}/>
              <FormControl.Feedback />
              <HelpBlock field={ingredient.quantity}/>
            </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div className={styles.toolbar}>
                <MultiValueFieldActions field={ingredients} index={index} />
              </div>
            </Col>
            </Row>
          </div>
        )}
        </Panel>
        <Panel header="Steps">
        <MultiValueField field={steps} pluralName="steps" singularName="step" toolbarClass={styles.toolbar}/>
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
