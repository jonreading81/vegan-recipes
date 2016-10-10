
import {getDefaultReducerActions, getActionType, formatFormData} from './utils';

const REQUEST = 'REQUEST_ADD';
const REQUEST_SUCCESS = 'REQUEST_ADD_SUCCESS';
const REQUEST_FAIL = 'REQUEST_ADD_FAIL';
const RESET = 'RESET_ADD';

const defaultState = {
  isFetching: false,
  didInvalidate: false,
  error: false,
  isSuccess: false,
  entity: {}
};

function createReducer(entity, defaultActions = getDefaultReducerActions) {
  return (state = {}, action = {}) => {
    switch (action.type) {
      case getActionType(entity, REQUEST):
        return {
          ...defaultState,
          isFetching: true
        };
      case getActionType(entity, REQUEST_FAIL):
        return {
          ...defaultState,
          didInvalidate: true,
          error: action.error
        };
      case getActionType(entity, REQUEST_SUCCESS):
        return {
          ...defaultState,
          entity: action.result,
          isSuccess: true
        };
      case getActionType(entity, RESET):
        return {
          ...defaultState
        };
      default:
        return defaultActions(state, action);
    }
  };
}

function createRequest(entity, path, formatData = formatFormData ) {
  return (data) => {
    const formattedData = formatData(data);
    return {
      types: [getActionType(entity, REQUEST), getActionType(entity, REQUEST_SUCCESS), getActionType(entity, REQUEST_FAIL)],
      promise: (client) => client.post(path, {
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
