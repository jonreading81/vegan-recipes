import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import api from './api';
import auth from './auth';
import survey from './survey';
import {reducer as imageList} from './images/list';
import {reducer as deleteImage} from './images/delete';
import {reducer as updateImage} from './images/update';
import {reducer as addImage} from './images/add';
import {reducer as addRecipe} from './recipes/add';
import {reducer as recipeList} from './recipes/list';
import {reducer as viewRecipe} from './recipes/view';
import {reducer as updateRecipe} from './recipes/update';
import {reducer as deleteRecipe} from './recipes/delete';
import {reducer as ingredients} from './recipes/ingredients';
import {reducer as quantities} from './recipes/quantities';
import {reducer as categories} from './recipes/categories';
import {reducer as diets} from './recipes/diets';
import register from './register';
import {reducer as articlesList} from './wordpress/articles';
import {reducer as viewPost} from './wordpress/post';
import {reducer as viewPage} from './wordpress/page';

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
  register,
  form,
  survey,
  imageList,
  updateImage,
  deleteImage,
  addImage,
  viewPost,
  viewPage,
  articlesList
});
