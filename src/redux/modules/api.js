const API_STATUS = '/api/STATUS';
const API_STATUS_SUCCESS = '/api/STATUS_SUCCESS';
const API_STATUS_FAIL = '/api/STATUS_FAIL';
const initialState = {
  status: false,
  loading: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case API_STATUS:
      return {
        status: false,
        loading: true
      };
    case API_STATUS_SUCCESS:
      return {
        status: true,
        loading: false
      };
    case API_STATUS_FAIL:
      return {
        status: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function getStatus() {
  return {
    types: [API_STATUS, API_STATUS_SUCCESS, API_STATUS_FAIL],
    promise: (client) => client.get('/status')
  };
}
