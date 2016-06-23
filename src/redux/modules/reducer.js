import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';

import auth from './auth';
import addRecipe from './addRecipe';
import recipeList from './recipeList';
import viewRecipe from './viewRecipe';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  recipeList,
  addRecipe,
  viewRecipe,
  form
});
