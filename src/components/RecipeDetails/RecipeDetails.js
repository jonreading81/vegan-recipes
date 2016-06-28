import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
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
        <p>{get(recipe, 'description')}</p>
        <p>{get(recipe, 'author')}</p>
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

