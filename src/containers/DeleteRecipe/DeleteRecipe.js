import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {requestGetRecipe} from 'redux/modules/viewRecipe';
import { asyncConnect } from 'redux-async-connect';
import get from 'lodash/get';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {goBack} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {requestDeleteRecipe} from 'redux/modules/deleteRecipe';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import {resetDeleteRecipe} from 'redux/modules/deleteRecipe';


@connect(
  (store) => {
    return {
      recipe: get(store.viewRecipe, 'recipe', {}),
      submitting: get(store.deleteRecipe, 'isFetching', false)
    };
  },
  (dispatch) => {
    return {
      cancel: bindActionCreators(goBack, dispatch),
      confirm: bindActionCreators(requestDeleteRecipe, dispatch),
      reset: bindActionCreators(resetDeleteRecipe, dispatch),
    };
  },
  (stateProps, dispatchProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      confirm: () => {
        dispatchProps.confirm(get(stateProps.recipe, '_id'));
      }
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch(requestGetRecipe(params.recipe));
  }
}])
export default class DeleteRecipeContainer extends Component {

  static propTypes = {
    params: PropTypes.object,
    recipe: PropTypes.object,
    confirm: PropTypes.func,
    cancel: PropTypes.func,
    reset: PropTypes.func,
    submitting: PropTypes.bool
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const {recipe, confirm, cancel, submitting} = this.props;
    return (
      <div>
        <Helmet title="Delete Recipe"/>
        <div className="container">
          <h1>Delete Recipe</h1>
          <p>Are you sure you would like to delete the following recipe?</p>
          <p>{get(recipe, 'title')}</p>
          <ButtonToolbar>
            <Button disabled={submitting} onClick={confirm} bsStyle="primary" bsSize="large" >Confirm</Button>
            <Button disabled={submitting} onClick={cancel} bsSize="large" >Cancel</Button>
          </ButtonToolbar>
           <SuccessModal title="Recipe Deleted">
            <p>The recipe was deleted sccessfully</p>
          </SuccessModal>
           <ErrorModal title="Deletion Failed">
            <p>The server returned an error while deleting the document</p>
          </ErrorModal>
       </div>
      </div>
    );
  }
}
