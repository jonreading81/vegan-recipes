import React, { Component } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList} from 'components';
import {mapRecipesToItems} from 'utils/recipes';


const mapStateToProps = (state) => {
  return {
    items: mapRecipesToItems(state.recipeList.items)
  };
};

const RecipeListComponent = connect(mapStateToProps)(ItemsList);

export default class RecipeListContainer extends Component {

  render() {
    return (
      <div>
        <Helmet title="Recipes"/>
        <div className="container">
          <h1>Recipes</h1>
          <RecipeListComponent/>
         </div>
      </div>
    );
  }
}
