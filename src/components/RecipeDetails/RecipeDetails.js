import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Button, ButtonToolbar, Table, Row, Col} from 'react-bootstrap';
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
    const styles = require('./RecipeDetails.scss');

    return (
      <Col md="10" mdOffset="1">
      <Row className={styles.details}>
        <Col xs="12" sm="4"><i className="fa fa-clock-o fa-2x" /><p>Prep: {myRecipe.getPreperationTime()}<br />Cook: {myRecipe.getCookingTime()}</p></Col>
        <Col xs="12" sm="4"><i className="fa fa-cog  fa-2x" aria-hidden="true" /><p>{myRecipe.getDifficulty()}</p></Col>
        <Col xs="12" sm="4"><i className="fa fa-male  fa-2x" aria-hidden="true" /><p>Serves {myRecipe.getYields()}</p></Col>
      </Row>
      <p className={styles.description}>{myRecipe.getDescription()}</p>
      <Row>
        <Col xs="12" sm="6">
          <h3>Ingredients</h3>
          <Table striped>
            <tbody>
            {myRecipe.getIngredients().map((ingredient) =>
              <tr>
                <td>{get(ingredient, 'name')}</td>
                <td>{get(ingredient, 'quantity')}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Col>
        <Col xs="12" sm="6">
          <h3>Method</h3>
          <Table>
          <tbody>
          {myRecipe.getSteps().map((step, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{step}</td>
            </tr>
          )}
          </tbody>
          </Table>
        </Col>
      </Row>
       <If condition={myRecipe.getSourceURL() !== ''}>
        <p>Source: <a href={myRecipe.getSourceURL()}>{myRecipe.getSourceURL()}</a></p>
      </If>
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
      </Col>
    );
  }
}

