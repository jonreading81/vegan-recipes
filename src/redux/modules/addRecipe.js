// Actions
const REQUEST_ADD_RECIPE = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE';
const REQUEST_ADD_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_SUCCESS';
const REQUEST_ADD_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_FAIL';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_ADD_RECIPE:
      return {
        isFetching: true,
        didInvalidate: false
      };
    case REQUEST_ADD_RECIPE_FAIL:
      return {
        isFetching: false,
        didInvalidate: true,
        error: action.error
      };
    case REQUEST_ADD_RECIPE_SUCCESS:
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
export function requestAddRecipe(params) {
  return {
    types: [REQUEST_ADD_RECIPE, REQUEST_ADD_RECIPE_SUCCESS, REQUEST_ADD_RECIPE_FAIL],
    promise: (client) => client.post('/recipes', {
      data: params
    })
  };
}

