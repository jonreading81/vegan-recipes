import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {RecipeDetails} from 'components';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';
import UserHelper from 'helpers/User';

@connect(
  (store) => {
    return {
      recipe: store.viewRecipe.entity,
      user: new UserHelper(store.auth.user)
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch( requestGet(params.recipe));
  }
}])
export default class ViewRecipeContainer extends Component {

  static propTypes = {
    recipe: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    const {recipe, user} = this.props;
    let content;

    if (recipe) {
      content = (
        <div>
          <Helmet title="View Recipes"/>
          <div className="container">
            <RecipeDetails recipe={recipe} />
            {user.isMemberOfGroup('admin') ? <p>hello admin user</p> : <p>hello norm</p>}
           </div>
        </div>
      );
    }else {
      content = (
        <NotFound />
      );
    }

    return content;
  }
}
