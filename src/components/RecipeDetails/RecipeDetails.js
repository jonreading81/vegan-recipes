import React, { Component, PropTypes } from 'react';

class RecipeDetail extends Component {

  static propTypes = {
    recipe: PropTypes.object.required
  };

  render() {
    const {recipe} = this.props;

    return (
      <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
      </div>
    );
  }
}

export default RecipeDetail;
