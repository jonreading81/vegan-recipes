import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
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
       <Panel header="Recipe Details"> <p>{myRecipe.getDescription()}</p>
        <p>Author: {myRecipe.getAuthor()}</p>
        <p>{myRecipe.getImage()}</p>
        <img src={myRecipe.getImageURL()}/>
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

