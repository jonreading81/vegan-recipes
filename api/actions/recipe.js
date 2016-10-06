
import Model  from '../models/recipe';
import {createActions} from './crud';

const  parseData =  (data) => {
  data.steps = JSON.parse(data.steps);
  data.ingredients = JSON.parse(data.ingredients);
  data.categories = JSON.parse(data.categories);
  data.dietarySuitability = JSON.parse(data.dietarySuitability);
}

const defaultActions = createActions(Model, parseData);
module.exports = {
  ...defaultActions,
  diets: () => {
    return defaultActions.getDistinctList("dietarySuitability");
  },
  ingredients: () => {
    return defaultActions.getDistinctList("ingredients.name");
  },
  quantities: () => {
    return defaultActions.getDistinctList("ingredients.quantity");
  },
  categories: () => {
    return defaultActions.getDistinctList('categories');
  }
};
