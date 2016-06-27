// Actions
const REQUEST_ADD_RECIPE = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE';
const REQUEST_ADD_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_SUCCESS';
const REQUEST_ADD_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_FAIL';
const RESET = 'vegan-recipes/recipes/RESET';

const defaultState = {
  isFetching: false,
  didInvalidate: false,
  error: false,
  recipeAdded: false
};
// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_ADD_RECIPE:
      return {
        ...defaultState,
        isFetching: true
      };
    case REQUEST_ADD_RECIPE_FAIL:
      return {
        ...defaultState,
        didInvalidate: true,
        error: action.error
      };
    case REQUEST_ADD_RECIPE_SUCCESS:
      return {
        ...defaultState,
        recipeAdded: action.result
      };
    case RESET:
      return {
        ...defaultState
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

export function resetAddRecipe() {
  return {
    type: RESET
  };
}


