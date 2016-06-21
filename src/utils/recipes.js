export function mapRecipesToItems(recipes) {
  const items = [];
  recipes.map(recipe => {
    items.push({
      id: recipe.slug,
      title: recipe.title,
      description: recipe.description,
      url: '/recipes/' + recipe.slug});
  });
  return items;
}
