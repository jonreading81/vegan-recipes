
import {getDefaultReducerActions, getActionType} from './utils';

const REQUEST = 'REQUEST_DELETE';
const REQUEST_SUCCESS = 'REQUEST_DELETE_SUCCESS';
const REQUEST_FAIL = 'REQUEST_DELETE_FAIL';
const RESET = 'RESET_DELETE';

function createReducer(entity, defaultActions = getDefaultReducerActions) {
  return (state = {}, action = {}) => {
    switch (action.type) {
      case getActionType(entity, REQUEST):
        return {
          isFetching: true,
          didInvalidate: false,
          isSuccess: false
        };
      case getActionType(entity, REQUEST_FAIL):
        return {
          isFetching: false,
          didInvalidate: true,
          error: action.error,
          isSuccess: false
        };
      case getActionType(entity, REQUEST_SUCCESS):
        return {
          isFetching: false,
          didInvalidate: false,
          isSuccess: true
        };
      case getActionType(entity, RESET):
        return {
          isFetching: false,
          didInvalidate: false,
          error: false,
          isSuccess: false
        };
      default:
        return defaultActions(state, action);
    }
  };
}

function createRequest(entity, path ) {
  return (id) => {
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.del(path + id)
    };
  };
}

function createReset(entity) {
  return () => {
    return {
      type: getActionType(entity, RESET)
    };
  };
}

export default function create(entity, path, formatData, additionalActions) {
  return {
    reducer: createReducer(entity, additionalActions),
    request: createRequest(entity, path, formatData, additionalActions),
    reset: createReset(entity)
  };
}
