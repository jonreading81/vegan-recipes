const SUBMIT = 'survey/SUBMIT';
const SUBMIT_SUCCESS = 'survey/SUBMIT_SUCCESS';
const SUBMIT_FAIL = 'survey/SUBMIT_FAIL';

const initialState = {
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT:
      return {
        ...state,
        loading: true,
        loadError: null
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        success: true,
        loadError: null
      };
    case SUBMIT_FAIL:
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

export function submit(data) {
  console.log(data);
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    promise: (client) => client.post('/survey',
      {
        data: data
      }
    )
  };
}
