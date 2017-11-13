import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EntityFormContainer, HeroPanel, BreadcrumbContainer, ImageForm} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import {reset as resetForm} from 'redux-form';
import ImageHelper from 'helpers/Image';
import {request as requestUpdateImage, reset as resetUpdateImage} from 'redux/modules/images/update';
const resetFormAction = resetForm('imageForm');
const resetStateAction = resetUpdateImage();
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (state) => {
    return {
      submitting: state.updateImage.isFetching,
      isSuccess: state.updateImage.isSuccess,
      error: state.updateImage.error
    };
  },
  (dispatch) => {
    return {
      onSubmit: (id, data) => {
        dispatch(requestUpdateImage(id, data));
      }
    };
  },
  (stateProps, dispatchProps, {params}) => {
    return {
      ...stateProps,
      ...dispatchProps,
      onSubmit: (data) => {
        dispatchProps.onSubmit(params.image, data);
      },
      image: ImageHelper.getImageFromSlug(params.image)
    };
  }
)
export default class UpdateRecipeContainer extends Component {

  static propTypes ={
    image: PropTypes.object,
    isSuccess: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.any,
    onSubmit: PropTypes.func
  }

  render() {
    const {image, isSuccess, error, onSubmit, submitting} = this.props;
    const myImageHelper = new ImageHelper(image);
    const initialValues = {
      name: myImageHelper.getName()
    };
    return (
      <div>
      <BreadcrumbContainer>
        <LinkContainer to="/images/list/all">
        <Breadcrumb.Item>Images</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{myImageHelper.getName()}</Breadcrumb.Item>
      </BreadcrumbContainer>
       <HeroPanel type="post-heading" title={myImageHelper.getName()} hasFixedBreadcrumb image={image} />
       <EntityFormContainer
        pageTitle = "Update Image"
        resetStateAction = {resetStateAction}
        resetFormAction = {resetFormAction}
        onSuccessCancelActions = {[resetStateAction]}
        getEntityURL = {() => '/images/list/all'}
        isSuccess = {isSuccess}
        isError = {error ? true : false}
        successMessage = "The Image was updated successfully click OK to  return the the image list"
        successTitle = "Image Updated">
          <ImageForm initialValues={initialValues} onSubmit={onSubmit} loading={submitting} />
        </EntityFormContainer>
      </div>
    );
  }
}
