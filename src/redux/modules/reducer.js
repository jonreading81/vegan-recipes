import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import api from './api';
import auth from './auth';
import mailchimp from './mailchimp';
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
import {reducer as addInspiration} from './inspiration/add';
import {reducer as inspirationList} from './inspiration/list';
import {reducer as viewInspiration} from './inspiration/view';
import {reducer as randomInspirationCollection} from './inspiration/randomCollection';
import {reducer as updateInspiration} from './inspiration/update';
import {reducer as deleteInspiration} from './inspiration/delete';
import {reducer as addLink} from './links/add';
import {reducer as linkList} from './links/list';
import {reducer as viewLink} from './links/view';
import {reducer as updateLink} from './links/update';
import {reducer as deleteLink} from './links/delete';
import configReducerCreater from './config';

export default (data) => combineReducers({
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
  articlesList,
  addInspiration,
  inspirationList,
  viewInspiration,
  randomInspirationCollection,
  updateInspiration,
  deleteInspiration,
  linkList,
  addLink,
  viewLink,
  updateLink,
  deleteLink,
  mailchimp,
  config: configReducerCreater(data)
});
