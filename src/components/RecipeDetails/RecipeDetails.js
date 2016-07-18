import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Image, Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
import get from 'lodash/get';
import RecipeHelper from 'helpers/Recipe';
import {AdminUser} from 'components';

export default class RecipeDetail extends Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired
  };

  render() {
    const {recipe} = this.props;
    const myRecipe = new RecipeHelper(recipe);

    return (
      <div>
       <h1>{myRecipe.getTitle()}</h1>
       <Panel header="Recipe Details">
         <Row>
          <Col xs={6} md={4}>
             <Image src={myRecipe.getImageURL()} thumbnail />
          </Col>
        </Row>
        <br />
        <p>Description: {myRecipe.getDescription()}</p>
        <p>Author: {myRecipe.getAuthor()}</p>
        <p>Source: {myRecipe.getSourceURL()}</p>
        <p>Difficulty: {myRecipe.getDifficulty()}</p>
        <p>Yields: {myRecipe.getYields()}</p>
      </Panel>
      <Panel header="Ingredients">
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Ingredient</th>
            <th>Quantity</th>
          </tr>
          </thead>
          <tbody>
          {myRecipe.getIngredients().map((ingredient, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{get(ingredient, 'name')}</td>
              <td>{get(ingredient, 'quantity')}</td>
            </tr>
          )}
          </tbody>
        </Table>
        </Panel>
         <Panel header="Steps">
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Step</th>
            </tr>
          </thead>
          <tbody>
          {myRecipe.getSteps().map((step, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{step}</td>
            </tr>
          )}
          </tbody>
          </Table>
        </Panel>
        <Panel header="Timings">
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Preperation Time</td>
              <td>{myRecipe.getPreperationTime()}</td>
            </tr>
            <tr>
              <td>Cooking Time</td>
              <td>{myRecipe.getCookingTime()}</td>
            </tr>
            <tr>
              <td>Total Time</td>
              <td>{myRecipe.getTotalTime()}</td>
            </tr>
          </tbody>
          </Table>
        </Panel>
        <Panel header="Categories">
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {myRecipe.getCategories().map((category, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{category}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </Panel>

      <Panel header="Dietary Suitability">
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Diet</th>
            </tr>
          </thead>
          <tbody>
          {myRecipe.getDietarySuitability().map((category, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{category}</td>
            </tr>
          )}
          </tbody>
        </Table>
        </Panel>
        <AdminUser>
          <ButtonToolbar>
          <LinkContainer to={myRecipe.getUpdateURL()}>
            <Button bsSize="large" >Update</Button>
          </LinkContainer>
           <LinkContainer to={myRecipe.getDeleteURL()}>
            <Button bsSize="large" >Delete</Button>
            </LinkContainer>
          </ButtonToolbar>
        </AdminUser>
      </div>
    );
  }
}

