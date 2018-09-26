import get from 'lodash/get';
const SUBSCRIBE_USER = '/mailchimp/SUBSCRIBE_USER';
const SUBSCRIBE_USER_SUCCESS = '/mailchimp/SUBSCRIBE_USER_SUCCESS';
const SUBSCRIBE_USER_FAIL = '/mailchimp/SUBSCRIBE_USER_FAIL';
const SUBSCRIBE_USER_HIDE = '/mailchimp/SUBSCRIBE_USER_HIDE';

const initialState = {
  loading: false,
  subscribed: false,
  display: true,

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
        display: false
      };
    default:
      return state;
  }
}
/* eslint-disable */

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

export function subscribeUserHide() {
  return {
    type: SUBSCRIBE_USER_HIDE
  };
}


export function subscribeUser({listId, email, name}) {
  return (dispatch, state, client) => {

    client.post(
      '/mailchimp',
      {
        data: {
          listId,
          email,
          name
        }
      }
    ).then(() => {
      dispatch(subscribeUserSuccess());
      setTimeout(5000, () => dispatch(subscribeUserHide()));
    })
    .catch(({response}) => {
      const message = JSON.parse(get(response, 'text'));
      const detail = get(message, 'detail') || 'API Error Could not add email address';
      dispatch(subscribeUserFail(detail));
    })
  };
}
