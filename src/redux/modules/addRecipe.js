// Actions
const REQUEST_ADD_RECIPE = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE';
const REQUEST_ADD_RECIPE_SUCCESS = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_SUCCESS';
const REQUEST_ADD_RECIPE_FAIL = 'vegan-recipes/recipes/REQUEST_ADD_RECIPE_FAIL';
const RESET_ADD_RECIPE = 'vegan-recipes/recipes/RESET_ADD_RECIPE';
import forOwn from 'lodash/forOwn';

const defaultState = {
  isFetching: false,
  didInvalidate: false,
  error: false,
  isSuccess: false,
  recipe: {}
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
        recipe: action.result,
        isSuccess: true
      };
    case RESET_ADD_RECIPE:
      return {
        ...defaultState
      };
    default:
      return state;
  }
}

// Action Creators
export function requestAddRecipe(params) {
  const formData = new FormData();
  forOwn(params, (value, key) => {
    formData.append(key, value);
  });
  formData.append('imageURL', params.imageURL[0]);

  return {
    types: [REQUEST_ADD_RECIPE, REQUEST_ADD_RECIPE_SUCCESS, REQUEST_ADD_RECIPE_FAIL],
    promise: (client) => client.post('/recipes', {
      data: formData
    })
  };
}

export function resetAddRecipe() {
  return {
    type: RESET_ADD_RECIPE
  };
}


