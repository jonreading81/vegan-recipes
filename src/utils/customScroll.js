export default function(prevLocation, location) {
  if (prevLocation) {
    const samePage = (prevLocation.pathname === location.pathname);
    const recipeListAction = (prevLocation.pathname.search('recipe/list') === 1 && location.pathname.search('recipe/list') === 1);
    if (samePage || recipeListAction) {
      return false;
    }
  }
  return true;
}
