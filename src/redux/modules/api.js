const STATUS = '/api/STATUS';
const STATUS_SUCCESS = '/api/STATUS_SUCCESS';
const STATUS_FAIL = '/api/STATUS_FAIL';
const GET_TOKEN = '/api/GET_TOKEN';
const GET_TOKEN_SUCCESS = '/api/GET_TOKEN_SUCCESS';
const GET_TOKEN_FAIL = '/api/GET_TOKEN_FAIL';

const initialState = {
  key: 'jonreading',
  secret: 'Jon121904',
  token: '',
  status: false,
  loading: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATUS:
      return {
        ...state,
        status: false,
        loading: true
      };
    case STATUS_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false
      };
    case STATUS_FAIL:
      return {
        ...state,
        status: false,
        loading: false,
        error: action.error
      };
    case GET_TOKEN:
      return {
        ...state,
        status: false,
        loading: true
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false
      };
    case GET_TOKEN_FAIL:
      return {
        ...state,
        status: false,
        loading: false,
        error: new Error('Invalid credentials')
      };
    default:
      return state;
  }
}

export function getAccessToken(key, secret) {
  return {
    types: [GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL],
    promise: (client) => client.post('/logout', {
      data: {
        username: key,
        password: secret
      }
    })
  };
}

export function getStatus() {
  return {
    types: [STATUS, STATUS_SUCCESS, STATUS_FAIL],
    promise: (client) => client.get('/status')
  };
}
