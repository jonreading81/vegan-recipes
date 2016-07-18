import get from 'lodash/get';
import forOwn from 'lodash/forOwn';
import isArray from 'lodash/isArray';
import yieldsOptions from 'data/yieldsOptions.json';
import difficultyOptions from 'data/difficultyOptions.json';
import timingOptions from 'data/timingOptions.json';
// import {mapSelectValueToArray} from 'utils/forms';

export default class Recipe {

  static formatFormData(data) {
    // data.categories = mapSelectValueToArray(data.categories);
    console.log(data);
    const formData = new FormData();
    forOwn(data, (fieldValue, fieldIndex) => {
      if (isArray(fieldValue)) {
        formData.append(fieldIndex, JSON.stringify(fieldValue));
      }else {
        formData.append(fieldIndex, fieldValue);
      }
    });
    formData.append('image', data.image[0]);
    return formData;
  }

  static getURLWithSlug(slug, action = false) {
    let URL = '/recipe/' + slug;
    if (action) {
      URL = URL + '/' + action;
    }
    return URL;
  }

  static getURLWithRecipeData(recipe) {
    const myRecipe = new Recipe(recipe);
    return myRecipe.getURL();
  }


  static mapToItems(recipes = []) {
    const items = [];
    recipes.map(recipe => {
      const myRecipe = new Recipe(recipe);
      items.push(myRecipe.getListItem());
    });
    return items;
  }

  constructor(recipe = {}) {
    this.recipe = recipe;
    this.listItem = {
      id: this.getSlug(),
      title: this.getTitle(),
      description: this.getDescription(),
      URL: this.getURL(),
      updateURL: this.getUpdateURL(),
      deleteURL: this.getDeleteURL(),
    };
    this.yieldOption = yieldsOptions.find(option => option.value === get(this.getRecipe(), 'yields'));
    this.difficultyOption = difficultyOptions.find(option => option.value === get(this.getRecipe(), 'difficulty'));
    this.preperationTimeOption = timingOptions.find(option => option.value === get(this.getRecipe(), 'preperationTime'));
    this.cookingTimeOption = timingOptions.find(option => option.value === get(this.getRecipe(), 'cookingTime'));
    this.totalTimeOption = timingOptions.find(option => option.value === get(this.getRecipe(), 'totalTime'));
  }

  getRecipe() {
    return this.recipe;
  }

  getURL(action = false) {
    return Recipe.getURLWithSlug( this.getSlug(), action);
  }

  getSlug() {
    return get(this.getRecipe(), 'slug');
  }

  getDescription() {
    return get(this.getRecipe(), 'description');
  }

  getTitle() {
    return get(this.getRecipe(), 'title');
  }

  getAuthor() {
    return get(this.getRecipe(), 'author');
  }

  getImage() {
    return get(this.getRecipe(), 'image');
  }

  getPreperationTime() {
    return get(this.preperationTimeOption, 'label');
  }

  getCookingTime() {
    return get(this.cookingTimeOption, 'label');
  }

  getTotalTime() {
    return get(this.totalTimeOption, 'label');
  }

  getDifficulty() {
    return get(this.difficultyOption, 'label');
  }

  getYields() {
    return get(this.yieldOption, 'label');
  }

  getSourceURL() {
    return get(this.getRecipe(), 'sourceURL');
  }

  getImageURL() {
    return '/images/' + this.getImage();
  }

  getUpdateURL() {
    return this.getURL('update');
  }

  getDeleteURL() {
    return this.getURL('delete');
  }

  getSteps() {
    return get(this.getRecipe(), 'steps', []);
  }

  getIngredients() {
    return get(this.getRecipe(), 'ingredients', []);
  }

  getDietarySuitability() {
    return get(this.getRecipe(), 'dietarySuitability', []);
  }

  getCategories() {
    return get(this.getRecipe(), 'categories', []);
  }

  getListItem() {
    return this.listItem;
  }
}

