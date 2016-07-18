
import {getDefaultReducerActions, getActionType, formatFormData} from './utils';

const REQUEST = 'REQUEST_UPDATE';
const REQUEST_SUCCESS = 'REQUEST_UPDATE_SUCCESS';
const REQUEST_FAIL = 'REQUEST_UPDATE_FAIL';
const RESET = 'RESET_UPDATE';

function createReducer(entity, defaultActions = getDefaultReducerActions) {
  return (state = {}, action = {}) => {
    switch (action.type) {
      case getActionType(entity, REQUEST):
        return {
          isFetching: true,
          didInvalidate: false,
          entity: {},
          isSuccess: false
        };
      case getActionType(entity, REQUEST_FAIL):
        return {
          isFetching: false,
          didInvalidate: true,
          error: action.error,
          entity: {},
          isSuccess: false
        };
      case getActionType(entity, REQUEST_SUCCESS):
        return {
          isFetching: false,
          didInvalidate: false,
          entity: action.result,
          isSuccess: true
        };
      case getActionType(entity, RESET):
        console.log('reset');
        return {
          isFetching: false,
          didInvalidate: false,
          error: false,
          entity: {},
          isSuccess: false
        };
      default:
        return defaultActions(state, action);
    }
  };
}

function createRequest(entity, path, formatData = formatFormData ) {
  return (id, data) => {
    const formattedData = formatData(data);
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.put(path + id, {
        data: formattedData
      })
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
