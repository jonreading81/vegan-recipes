import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import api from './api';
import auth from './auth';
import {reducer as addRecipe} from './recipes/add';
import {reducer as recipeList} from './recipes/list';
import {reducer as viewRecipe} from './recipes/view';
import {reducer as updateRecipe} from './recipes/update';
import {reducer as deleteRecipe} from './recipes/delete';
import {reducer as ingredients} from './recipes/ingredients';
import {reducer as quantities} from './recipes/quantities';
import {reducer as categories} from './recipes/categories';
import {reducer as diets} from './recipes/diets';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  api,
  auth,
  recipeList,
  addRecipe,
  viewRecipe,
  updateRecipe,
  deleteRecipe,
  ingredients,
  quantities,
  categories,
  diets,
  form
});
