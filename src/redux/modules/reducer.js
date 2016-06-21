import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';

import auth from './auth';
import recipe from './recipe';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  recipe,
  form
});
