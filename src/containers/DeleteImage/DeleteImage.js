import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {request as requestDeleteImage, reset as resetDeleteImage} from 'redux/modules/images/delete';
import {HeroPanel, DeleteEntity, BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import get from 'lodash/get';
import { LinkContainer } from 'react-router-bootstrap';
import ImageHelper from 'helpers/Image';

@connect(
  (state) => {
    return {
      submitting: get(state.deleteImage, 'isFetching', false),
      isSuccess: state.deleteImage.isSuccess,
      error: state.deleteImage.error
    };
  },
  (dispatch) => {
    return {
      deleteImage: bindActionCreators(requestDeleteImage, dispatch),
    };
  },
  (stateProps, dispatchProps, {params}) => {
    return {
      ...stateProps,
      ...dispatchProps,
      deleteImage: () => {
        dispatchProps.deleteImage(params.image);
      },
      image: ImageHelper.getImageFromSlug(params.image)
    };
  }
)
export default class DeleteRecipeContainer extends Component {

  static propTypes = {
    image: PropTypes.object,
    deleteImage: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.bool,
    isSuccess: PropTypes.bool
  };

  render() {
    const {
      image,
      deleteImage,
      submitting,
      isSuccess,
      error
    } = this.props;

    const myImageHelper = new ImageHelper(image);

    return (
      <div>
        <BreadcrumbContainer>
          <LinkContainer to="/images/list/all">
            <Breadcrumb.Item>Images</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={myImageHelper.getURL()}>
            <Breadcrumb.Item>{myImageHelper.getName()}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Delete</Breadcrumb.Item>
        </BreadcrumbContainer>
        <HeroPanel type="post-heading" hasBreadcrumb image={myImageHelper.getImage()} title={myImageHelper.getName()} />
        <DeleteEntity
          deleteEntity={deleteImage}
          resetStateAction={resetDeleteImage()}
          pageTitle="Delete Image"
          submitting={submitting}
          isSuccess = {isSuccess}
          isError = {error ? true : false}
          successMessage = "The Image was deleted successfully"
          successTitle = "Image Deleted"
          successURL="/images/list/all"
          >
          <p>Are you sure you would like to delete the following image?</p>
          <p>{myImageHelper.getName()}</p>
          </DeleteEntity>
      </div>
    );
  }
}
