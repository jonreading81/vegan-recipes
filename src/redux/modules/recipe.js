// Actions
const REQUEST_RECIPES = 'vegan-recipes/recipes/REQUEST_RECIPES';
const REQUEST_RECIPES_SUCCESS = 'vegan-recipes/recipes/REQUEST_RECIPES_SUCCESS';
const REQUEST_RECIPES_FAIL = 'vegan-recipes/recipes/REQUEST_RECIPES_FAIL';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        	isFetching: true,
        	didInvalidate: false
      });
    case REQUEST_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.result
      });
    default:
      return state;
  }
}

// Action Creators
export function requestRecipes() {
  return {
    types: [REQUEST_RECIPES, REQUEST_RECIPES_SUCCESS, REQUEST_RECIPES_FAIL],
    promise: (client) => client.get('/recipes')
  };
}

