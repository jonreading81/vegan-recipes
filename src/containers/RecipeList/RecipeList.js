import React, { Component } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList} from 'components';
import {mapRecipesToItems} from 'utils/recipes';
import { request as requestList} from 'redux/modules/recipes/list';

import { asyncConnect } from 'redux-async-connect';

const mapStateToProps = (state) => {
  return {
    items: mapRecipesToItems(state.recipeList.items)
  };
};

const RecipeListComponent = connect(mapStateToProps)(ItemsList);


@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(requestList());
  }
}])
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
