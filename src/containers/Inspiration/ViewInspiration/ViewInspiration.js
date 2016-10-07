import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/inspiration/view';
import { asyncConnect } from 'redux-async-connect';
import {FullscreenInspiration, Loading} from 'components';
import ViewHelper from 'helpers/Inspiration';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (store) => {
    return {
      entity: store.viewInspiration.entity,
      isFetching: store.viewInspiration.isFetching
    };
  }
)
@asyncConnect([{
  promise: ({params, store: {dispatch}}) => {
    return dispatch( requestGet(params.entity));
  }
}])
export default class ViewInspirationContainer extends Component {

  static propTypes = {
    entity: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {entity, isFetching} = this.props;
    const myHelper = new ViewHelper(entity);
    let content;

    if (entity) {
      content = (
        <div>
          <Helmet title="View Inspiration"/>
          <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
          <BreadcrumbContainer>
            <LinkContainer to="/Inspiration/list/all">
              <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{myHelper.getTitle()}</Breadcrumb.Item>
          </BreadcrumbContainer>
           <FullscreenInspiration image={myHelper.getImage()} quote={myHelper.getQuote()} author={myHelper.getQuoteAuthor()} />
          </If>
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
