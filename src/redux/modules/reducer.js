import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';

import auth from './auth';
import addRecipe from './addRecipe';
import recipeList from './recipeList';
import viewRecipe from './viewRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  recipeList,
  addRecipe,
  viewRecipe,
  updateRecipe,
  deleteRecipe,
  form
});
