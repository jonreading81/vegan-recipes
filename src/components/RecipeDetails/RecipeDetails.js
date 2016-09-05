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
      <Col md={10} mdOffset={1}>
      <Row className={styles.details}>
        <Col xs={12} sm={4}>
          <p className={styles.iconWrapper + ' fa-stack fa-lg'}>
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-clock-o fa-stack-1x fa-inverse"></i>
          </p>
          <p className={styles.cookingDetail}>
            Prep: {myRecipe.getPreperationTime()}<br />
            <If condition={myRecipe.getCookingTime() !== 0}>Cook: {myRecipe.getCookingTime()}</If>
          </p>
        </Col>
        <Col xs={12} sm={4}>
        <p className={styles.iconWrapper + ' fa-stack fa-lg'}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-cutlery fa-stack-1x fa-inverse"></i>
        </p>
        <p className={styles.difficultyDetail}>{myRecipe.getDifficulty()}</p>
        </Col>
        <Col xs={12} sm={4}>
          <p className={styles.iconWrapper + ' fa-stack fa-lg'}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-male fa-stack-1x fa-inverse"></i>
        </p>
          <p className={styles.servesDetail}>Serves {myRecipe.getYields()}</p>
        </Col>
      </Row>
      <p className="intro">{myRecipe.getDescription()}</p>
      <Row>
        <Col xs={12} sm={6}>
          <h3>Ingredients</h3>
          <Table striped>
            <tbody>
            {myRecipe.getIngredients().map((ingredient, index) =>
              <tr key={'ingredient-' + index}>
                <td>{get(ingredient, 'name')}</td>
                <td>{get(ingredient, 'quantity')}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Col>
        <Col xs={12} sm={6}>
          <h3>Method</h3>
          <Table>
          <tbody>
          {myRecipe.getSteps().map((step, index) =>
            <tr key={'step-' + index}>
              <td className={styles.step}>{index + 1}</td>
              <td className={styles.step}>{step}</td>
            </tr>
          )}
          </tbody>
          </Table>
        </Col>
      </Row>
       <If condition={myRecipe.getSourceURL() !== ''}>
        <p className={styles.source}>Source: <a href={myRecipe.getSourceURL()}>{myRecipe.getSourceURL()}</a></p>
      </If>
      <AdminUser>
        <ButtonToolbar>
        <LinkContainer to={myRecipe.getUpdateURL()}>
          <Button bsStyle="primary" bsSize="large" >Update</Button>
        </LinkContainer>
         <LinkContainer to={myRecipe.getDeleteURL()}>
          <Button bsStyle="primary" bsSize="large" >Delete</Button>
          </LinkContainer>
        </ButtonToolbar>
      </AdminUser>
      </Col>
    );
  }
}

