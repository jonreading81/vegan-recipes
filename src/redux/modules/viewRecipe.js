// Actions
const REQUEST_GET_RECIPE = 'vegan-recipes/recipes/REQUEST_GET_RECIPE';
const REQUEST_GET_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_GET_RECIPE_SUCCESS';
const REQUEST_GET_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_GET_RECIPE_FAIL';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_GET_RECIPE:
      return {
        isFetching: true,
        didInvalidate: false,
        recipe: {}
      };
    case REQUEST_GET_RECIPE_FAIL:
      return {
        isFetching: false,
        didInvalidate: true,
        error: action.error
      };
    case REQUEST_GET_RECIPE_SUCCESS:
      return {
        isFetching: false,
        didInvalidate: false,
        recipe: action.result
      };
    default:
      return state;
  }
}

// Action Creators
export function requestGetRecipe(id) {
  return {
    types: [REQUEST_GET_RECIPE, REQUEST_GET_RECIPE_SUCCESS, REQUEST_GET_RECIPE_FAIL],
    promise: (client) => client.get('/recipes/' + id)
  };
}

