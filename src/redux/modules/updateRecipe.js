// Actions
const REQUEST_UPDATE_RECIPE = 'vegan-recipes/recipes/REQUEST_UPDATE_RECIPE';
const REQUEST_UPDATE_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_UPDATE_RECIPE_SUCCESS';
const REQUEST_UPDATE_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_UPDATE_RECIPE_FAIL';
const RESET_UPDATE_RECIPE = 'vegan-recipes/recipes/RESET_UPDATE_RECIPE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_UPDATE_RECIPE:
      return {
        isFetching: true,
        didInvalidate: false,
        recipe: {},
        isSuccess: false
      };
    case REQUEST_UPDATE_RECIPE_FAIL:
      return {
        isFetching: false,
        didInvalidate: true,
        error: action.error,
        recipe: {},
        isSuccess: false
      };
    case REQUEST_UPDATE_RECIPE_SUCCESS:
      return {
        isFetching: false,
        didInvalidate: false,
        recipe: action.result,
        isSuccess: true
      };
    case RESET_UPDATE_RECIPE:
      return {
        isFetching: false,
        didInvalidate: false,
        error: false,
        recipe: {},
        isSuccess: false
      };
    default:
      return state;
  }
}

// Action Creators
export function requestUpdateRecipe(id, params) {
  return {
    types: [REQUEST_UPDATE_RECIPE, REQUEST_UPDATE_RECIPE_SUCCESS, REQUEST_UPDATE_RECIPE_FAIL],
    promise: (client) => client.put('/recipes/' + id, {
      data: params
    })
  };
}

export function resetUpdateRecipe() {
  return {
    type: RESET_UPDATE_RECIPE
  };
}

