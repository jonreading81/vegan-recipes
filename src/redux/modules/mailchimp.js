import get from 'lodash/get';
import { reset } from 'redux-form';
const SUBSCRIBE_USER = '/mailchimp/SUBSCRIBE_USER';
const SUBSCRIBE_USER_SUCCESS = '/mailchimp/SUBSCRIBE_USER_SUCCESS';
const SUBSCRIBE_USER_FAIL = '/mailchimp/SUBSCRIBE_USER_FAIL';
const SUBSCRIBE_USER_HIDE = '/mailchimp/SUBSCRIBE_USER_HIDE';
const SUBSCRIBE_USER_SHOW = '/mailchimp/SUBSCRIBE_USER_SHOW';
const initialState = {
  loading: false,
  subscribed: false,
  displayed: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBSCRIBE_USER:
      return {
        ...state,
        loading: true,
        subscribed: false
      };
    case SUBSCRIBE_USER_SUCCESS:
      return {
        ...state,
        subscribed: true,
        loading: false
      };
    case SUBSCRIBE_USER_FAIL:
      return {
        ...state,
        subscribed: false,
        loading: false,
        error: new Error(action.message)
      };
    case SUBSCRIBE_USER_HIDE:
      return {
        ...state,
        displayed: false,
        subscribed: false
      };
    case SUBSCRIBE_USER_SHOW:
      return {
        ...state,
        displayed: true
      };
    default:
      return state;
  }
}

export function subscribeUserFail(message) {
  return {
    type: SUBSCRIBE_USER_FAIL,
    message
  };
}

export function subscribeUserSuccess() {
  return {
    type: SUBSCRIBE_USER_SUCCESS
  };
}

export function hideSubscribeUser() {
  return {
    type: SUBSCRIBE_USER_HIDE
  };
}

export function showSubscribeUser() {
  return {
    type: SUBSCRIBE_USER_SHOW
  };
}

export function subscribeUser({listId, email, name}) {
  return (dispatch, state, client) => {
    const data = {
      listId,
      email,
      name
    };
    client.post( '/mailchimp', { data })
    .then(() => {
      dispatch(subscribeUserSuccess());
      setTimeout(() => {
        dispatch(hideSubscribeUser());
        dispatch(reset('mailchimp'));
      }, 3000);
    })
    .catch(({response}) => {
      const message = JSON.parse(get(response, 'text'));
      const detail = get(message, 'detail') || 'API Error Could not add email address';
      dispatch(subscribeUserFail(detail));
    });
  };
}
