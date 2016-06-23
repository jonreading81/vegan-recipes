import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {requestGetRecipe} from 'redux/modules/viewRecipe';
import { asyncConnect } from 'redux-async-connect';

const mapStoreToPropsForRecipeDetails = (store) => {
  return {
    recipe: store.viewRecipe.recipe
  };
};

const ViewRecipeRecipeDetailsComponent = connect(mapStoreToPropsForRecipeDetails)(RecipeDetails);

@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGetRecipe(params.recipe));
  }
}])
class ViewRecipeContainer extends Component {
  render() {
    return (
      <div>
        <Helmet title="View Recipes"/>
        <div className="container">
          <ViewRecipeRecipeDetailsComponent />
         </div>
      </div>
    );
  }
}

ViewRecipeContainer.propTypes = {
  params: PropTypes.object,
  requestGetRecipe: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestGetRecipe: bindActionCreators(requestGetRecipe, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ViewRecipeContainer);
