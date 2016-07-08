import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import FormGroup from 'components/Form/FormGroup';
import MultiValueFieldActions from 'components/Form/MultiValueFieldActions';
import MultiValueFieldAddButton from 'components/Form/MultiValueFieldAddButton';
import {Button, ButtonToolbar, FormControl, ControlLabel, Col, Row, Panel} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';
import validation from './validation';
const validate = values => validation(values);
export const fields = [
  'title',
  'description',
  'author',
  'imageURL',
  'ingredients[].name',
  'ingredients[].quantity',
  'steps[].step',
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
      fields: { title, author, imageURL, description, ingredients, steps},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    const styles = require('./RecipeForm.scss');

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

          <FormGroup controlId="imageURL" type="text" field={imageURL}>
            <ControlLabel>ImageURL</ControlLabel>
            <FormControl type="file" placeholder="Enter ImageURL" {...imageURL} value={ null }/>
            <FormControl.Feedback />
            <HelpBlock field={imageURL}/>
          </FormGroup>

          <FormGroup controlId="description" type="text" field={description}>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter description" {...description}/>
            <FormControl.Feedback />
            <HelpBlock field={description}/>
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
        {!steps.length && <div>No steps</div>}
        <MultiValueFieldAddButton field={steps} title="Add steps"/>
        {steps.map((step, index) =>
          <div key={index} >
            <Row>
            <Col xs={12} md={8}>
            <FormGroup controlId={'step-' + (index + 1)} type="text" field={step.step}>
              <ControlLabel>Step #{index + 1}</ControlLabel>
              <FormControl type="input" placeholder="Enter step" {...step.step}/>
              <FormControl.Feedback />
              <HelpBlock field={step.step}/>
            </FormGroup>
            </Col>
             <Col xs={12} md={4}>
              <div className={styles.toolbar}>
                <MultiValueFieldActions field={steps} index={index} />
              </div>
            </Col>
            </Row>
          </div>
        )}
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
