import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reset as resetForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import { request as requestAddImage, reset as resetAddImage} from 'redux/modules/images/add';
import {ImageForm} from 'components';
import {HeroPanel, EntityFormContainer} from 'components';
const resetFormAction = resetForm('recipeForm');
const resetStateAction = resetAddImage();

@connect(
  (state) => {
    return {
      image: state.addImage.entity,
      isSuccess: state.addImage.isSuccess,
      submitting: state.addImage.isFetching,
      error: state.addImage.error
    };
  },
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAddImage, dispatch)
    };
  }
)
export default class AddRecipeContainer extends Component {

  static propTypes ={
    image: PropTypes.object,
    isSuccess: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
  }

  render() {
    const {image, isSuccess, error, onSubmit, submitting} = this.props;
    return (
      <div>
        <HeroPanel isEmpty image="forest.jpeg" />
       <EntityFormContainer
        entity ={image}
        pageTitle = "Addx Image"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction, resetFormAction]}
        getEntityURL = {() => '/images/list/all'}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Image was added successfully click OK to return to the image list"
        successTitle = "Image Added"
        >
        <ImageForm onSubmit={onSubmit} loading={submitting} />
        </EntityFormContainer>
      </div>
    );
  }
}
