import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {NotFound} from 'containers';
import {request as requestGet} from 'redux/modules/inspiration/view';
import { asyncConnect } from 'redux-async-connect';
import {InspirationSlideshow} from 'components';
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
    const {entity} = this.props;
    let content;

    if (entity) {
      const myHelper = new ViewHelper(entity.item);
      content = (
        <div>
          <Helmet title = {myHelper.getTitle()}/>
          <InspirationSlideshow item={entity.item} prev={entity.prev} next={entity.next} />
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
