import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ItemsList} from 'components';
import {mapRecipesToItems} from 'utils/recipes';
import { request as requestList} from 'redux/modules/recipes/list';
import { asyncConnect } from 'redux-async-connect';

@connect(
  (state) => {
    return {
      items: mapRecipesToItems(state.recipeList.items),
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(requestList());
  }
}])
export default class RecipeListContainer extends Component {

  static propTypes = {
    items: PropTypes.array
  }

  render() {
    const {items} = this.props;

    return (
      <div>
        <Helmet title="Recipes"/>
        <div className="container">
          <h1>Recipes</h1>
          <ItemsList items={items}/>
         </div>
      </div>
    );
  }
}
