
const REQUEST = 'register/REQUEST';
export const REQUEST_SUCCESS = 'register/REQUEST_SUCCESS';
const REQUEST_FAIL = 'register/REQUEST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
        loadError: null
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result,
        loadError: null
      };
    case REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        loadError: action.error
      };
    default:
      return state;
  }
}


export function request(params) {
  return {
    types: [REQUEST, REQUEST_SUCCESS, REQUEST_FAIL],
    promise: (client) => client.post('/register', {
      data: params,
      Accept: 'application/json'
    })
  };
}

