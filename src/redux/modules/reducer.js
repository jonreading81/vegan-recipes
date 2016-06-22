import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';

import auth from './auth';
import addRecipe from './addRecipe';
import recipeList from './recipeList';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  recipeList,
  addRecipe,
  form
});
