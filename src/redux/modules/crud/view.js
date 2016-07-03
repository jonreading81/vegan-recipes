
import {getDefaultReducerActions, getActionType} from './utils';

const REQUEST = 'REQUEST_GET';
const REQUEST_SUCCESS = 'REQUEST_GET_SUCCESS';
const REQUEST_FAIL = 'REQUEST_GET_FAIL';

function createReducer(entity, defaultActions = getDefaultReducerActions) {
  return (state = {}, action = {}) => {
    switch (action.type) {
      case getActionType(entity, REQUEST):
        return {
          isFetching: true,
          didInvalidate: false,
          entity: {}
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
          entity: action.result
        };
      default:
        return defaultActions(state, action);
    }
  };
}

function createRequest(entity, path) {
  return (id) => {
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.get(path + id)
    };
  };
}


export default function create(entity, path, additionalActions) {
  return {
    reducer: createReducer(entity, additionalActions),
    request: createRequest(entity, path, additionalActions)
  };
}
