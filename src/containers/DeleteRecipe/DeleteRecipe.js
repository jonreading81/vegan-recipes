import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/recipes/view';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import {request as requestDeleteRecipe, reset as resetDeleteRecipe} from 'redux/modules/recipes/delete';
import {HeroPanel, Loading, DeleteEntity} from 'components';
import get from 'lodash/get';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import RecipeHelper from 'helpers/Recipe';

@connect(
  (state) => {
    return {
      recipe: get(state.viewRecipe, 'entity', {}),
      isFetching: state.viewRecipe.isFetching,
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
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.bool,
    isSuccess: PropTypes.bool
  };

  render() {
    const {
      recipe,
      deleteRecipe,
      submitting,
      isFetching,
      isSuccess,
      error
    } = this.props;
    const myRecipeHelper = new RecipeHelper(recipe);

    return (
      <div>
        <If condition={isFetching}>
          <Loading />
        </If>
          <If condition={!isFetching}>
          <HeroPanel type="post-heading" image={myRecipeHelper.getImage()} title={myRecipeHelper.getTitle()} subTitle={myRecipeHelper.getShortDescription() + ', by ' + myRecipeHelper.getAuthor()}/>
         <div className="breadcrumb-wrapper">
               <div className="container">
                 <Breadcrumb>
                  <LinkContainer to="/recipe/list/all">
                    <Breadcrumb.Item>Recipes</Breadcrumb.Item>
                  </LinkContainer>
                  <LinkContainer to={myRecipeHelper.getURL()}>
                    <Breadcrumb.Item>{myRecipeHelper.getTitle()}</Breadcrumb.Item>
                  </LinkContainer>
                  <Breadcrumb.Item active>Delete</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
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
        </If>
      </div>
    );
  }
}
