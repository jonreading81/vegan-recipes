import React, { Component, PropTypes } from 'react';

class RecipeDetail extends Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired
  };

  render() {
    const recipe = Object.assign(
      {
        title: '',
        description: ''
      },
      this.props.recipe);

    return (
      <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
      </div>
    );
  }
}

export default RecipeDetail;
