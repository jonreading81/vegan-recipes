import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/inspiration/randomCollection';
import { asyncConnect } from 'redux-async-connect';
import {InspirationSlideshow, Loading} from 'components';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ViewHelper from 'helpers/Inspiration';

@connect(
  (store) => {
    return {
      items: store.randomInspirationCollection.entity,
      isFetching: store.randomInspirationCollection.isFetching
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
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {items, isFetching} = this.props;
    let content;

    if (items && items.length && items.length > 0) {
      const myHelper = new ViewHelper(items[0]);
      content = (
        <div>
          <Helmet title = "View Inspiration"/>
          <If condition = {isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
          <BreadcrumbContainer>
            <LinkContainer to="/Inspiration/list/all">
              <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{myHelper.getTitle()}</Breadcrumb.Item>
          </BreadcrumbContainer>
           <InspirationSlideshow items={items} />
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
