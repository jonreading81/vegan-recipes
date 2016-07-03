import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import {request as requestDeleteRecipe, reset as resetDeleteRecipe} from 'redux/modules/recipes/delete';
import {DeleteEntity} from 'components';
import get from 'lodash/get';

@connect(
  (state) => {
    return {
      recipe: get(state.viewRecipe, 'entity', {}),
      submitting: get(state.deleteRecipe, 'isFetching', false),
      isSuccess: state.deleteRecipe.isSuccess,
      error: state.deleteRecipe.error
    };
  },
  (dispatch) => {
    return {
      deleteRecipe: bindActionCreators(requestDeleteRecipe, dispatch),
    };
  },
  (stateProps, dispatchProps, componentProps) => {
    return {
      ...componentProps,
      ...stateProps,
      ...dispatchProps,
      deleteRecipe: () => {
        dispatchProps.deleteRecipe(get(stateProps.recipe, '_id'));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGet(params.recipe));
  }
}])
export default class DeleteRecipeContainer extends Component {

  static propTypes = {
    recipe: PropTypes.object,
    deleteRecipe: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.bool,
    isSuccess: PropTypes.bool
  };

  render() {
    const {
      recipe,
      deleteRecipe,
      submitting,
      isSuccess,
      error
    } = this.props;

    return (
      <div>
        <DeleteEntity
          deleteEntity={deleteRecipe}
          resetStateAction={resetDeleteRecipe()}
          pageTitle="Delete Recipe"
          submitting={submitting}
          isSuccess = {isSuccess}
          isError = {error ? true : false}
          successMessage = "The Recipe was deleted successfully"
          successTitle = "Recipe Deleted"
          successURL="/recipe/list"
          >
          <p>Are you sure you would like to delete the following recipe?</p>
          <p>{get(recipe, 'title')}</p>
        </DeleteEntity>
      </div>
    );
  }
}
