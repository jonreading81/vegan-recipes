import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
import get from 'lodash/get';
import {getURL as getRecipeURL} from 'utils/recipes';

export default class RecipeDetail extends Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired
  };

  render() {
    const {recipe} = this.props;

    return (
      <div>
       <h1>{get(recipe, 'title')}</h1>
       <Panel header="Recipe Details"> <p>{get(recipe, 'description')}</p>
        <p>Author: {get(recipe, 'author')}</p>
        <p>{get(recipe, 'author')}</p>
        <p>{get(recipe, 'imageURL')}</p>
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
          {get(recipe, 'ingredients', []).map((ingredient, index) =>
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
          {get(recipe, 'steps', []).map((step, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{get(step, 'step')}</td>
            </tr>
          )}
          </tbody>
          </Table>
          </Panel>

         <ButtonToolbar>
          <LinkContainer to={getRecipeURL(recipe, 'update')}>
            <Button bsSize="large" >Update</Button>
          </LinkContainer>
           <LinkContainer to={getRecipeURL(recipe, 'delete')}>
            <Button bsSize="large" >Delete</Button>
            </LinkContainer>
          </ButtonToolbar>
      </div>
    );
  }
}

