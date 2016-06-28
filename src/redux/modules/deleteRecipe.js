// Actions
const REQUEST_DELETE_RECIPE = 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE';
const REQUEST_DELETE_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE_SUCCESS';
const REQUEST_DELETE_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE_FAIL';
const RESET_DELETE_RECIPE = 'vegan-recipes/recipes/RESET_DELETE_RECIPE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_DELETE_RECIPE:
      return {
        isFetching: true,
        didInvalidate: false,
        isSuccess: false
      };
    case REQUEST_DELETE_RECIPE_FAIL:
      return {
        isFetching: false,
        didInvalidate: true,
        error: action.error,
        isSuccess: false
      };
    case REQUEST_DELETE_RECIPE_SUCCESS:
      return {
        isFetching: false,
        didInvalidate: false,
        isSuccess: true
      };
    case RESET_DELETE_RECIPE:
      return {
        isFetching: false,
        didInvalidate: false,
        error: false,
        isSuccess: false
      };
    default:
      return state;
  }
}

// Action Creators
export function requestDeleteRecipe(id) {
  return {
    types: [REQUEST_DELETE_RECIPE, REQUEST_DELETE_RECIPE_SUCCESS, REQUEST_DELETE_RECIPE_FAIL],
    promise: (client) => client.del('/recipes/' + id)
  };
}

export function resetDeleteRecipe() {
  return {
    type: RESET_DELETE_RECIPE
  };
}

