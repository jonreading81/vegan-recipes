import get from 'lodash/get';

export function getURLWithSlug(slug, action = false) {
  let URL = '/recipe/' + slug;
  if (action) {
    URL = URL + '/' + action;
  }
  return URL;
}

export function getURL(recipe, action = false) {
  return getURLWithSlug( get(recipe, 'slug'), action);
}

export function mapRecipesToItems(recipes) {
  const items = [];
  recipes.map(recipe => {
    items.push({
      id: get(recipe, 'slug'),
      title: get(recipe, 'title'),
      description: get(recipe, 'description'),
      url: getURL(recipe)
    });
  });
  return items;
}


