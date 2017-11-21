import {request as requestPage} from '../modules/wordpress/page';

export default (slug) => (
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage(slug));
    }
  }
);
