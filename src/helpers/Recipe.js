import get from 'lodash/get';

export default class Recipe {

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
    return get(this.getRecipe(), 'steps');
  }

  getIngredients() {
    return get(this.getRecipe(), 'ingredients');
  }

  getListItem() {
    return this.listItem;
  }
}

