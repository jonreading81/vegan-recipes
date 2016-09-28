
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

function getSearchTerm(searchTerm) {
  let term;
  if (searchTerm === '') {
    term = 'all';
  }else {
    term = searchTerm;
  }
  return term;
}

function defaultParseURL(path, searchTerm, page ) {
  let requestPath;
  requestPath = path.replace(':term', getSearchTerm(searchTerm));
  requestPath = requestPath.replace(':page', page);
  return requestPath;
}

function createRequest(entity, path, parseURL) {
  return (searchTerm = 'all', page = 1) => {
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.get(parseURL(path, searchTerm, page)),
      term: getSearchTerm(searchTerm)
    };
  };
}


export default function create(entity, path, additionalActions, parseURL = defaultParseURL) {
  return {
    reducer: createReducer(entity, additionalActions),
    request: createRequest(entity, path, parseURL)
  };
}
