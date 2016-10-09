import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/inspiration/view';
import { asyncConnect } from 'redux-async-connect';
import {InspirationDetails, Loading} from 'components';
import ViewHelper from 'helpers/Inspiration';

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
    entity: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {entity, isFetching} = this.props;
    const myHelper = new ViewHelper(entity);
    let content;

    if (entity) {
      content = (
        <div>
          <Helmet title = {myHelper.getTitle()}/>
          <If condition = {isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <InspirationDetails entity={entity} />
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
