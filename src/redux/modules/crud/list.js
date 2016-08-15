
import {getDefaultReducerActions, getActionType} from './utils';

const REQUEST = 'REQUEST_LIST';
const REQUEST_SUCCESS = 'REQUEST_LIST_SUCCESS';
const REQUEST_FAIL = 'REQUEST_LIST_FAIL';

function createReducer(entity, defaultActions = getDefaultReducerActions) {
  return (state = {}, action = {}) => {
    switch (action.type) {
      case getActionType(entity, REQUEST):
        return {
          isFetching: true,
          didInvalidate: false,
          items: state.items,
          term: action.term
        };
      case getActionType(entity, REQUEST_FAIL):
        return {
          isFetching: false,
          didInvalidate: true,
          error: action.error
        };
      case getActionType(entity, REQUEST_SUCCESS):
        return {
          isFetching: false,
          didInvalidate: false,
          items: action.result,
          term: state.term
        };
      default:
        return defaultActions(state, action);
    }
  };
}

function createRequest(entity, path) {
  return (searchTerm = 'all', page = 1) => {
    console.log(searchTerm);
    let term;
    let requestPath;
    if (searchTerm === '') {
      term = 'all';
    }else {
      term = searchTerm;
    }

    requestPath = path.replace(':term', term);
    requestPath = requestPath.replace(':page', page);
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.get(requestPath),
      term: term
    };
  };
}


export default function create(entity, path, additionalActions) {
  return {
    reducer: createReducer(entity, additionalActions),
    request: createRequest(entity, path)
  };
}
