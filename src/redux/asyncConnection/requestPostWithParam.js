import {request as requestPost} from '../modules/wordpress/post';

export default (param) => (
  {
    promise: ({params, store: {dispatch}}) => {
      return dispatch(requestPost(params[param]));
    }
  }
);
