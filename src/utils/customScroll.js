export default function(prevLocation, location) {
  if (prevLocation) {
    const samePage = (prevLocation.pathname === location.pathname);
    const recipeListAction = (prevLocation.pathname.search('list') > 0 && location.pathname.search('list') > 0);
    if (samePage || recipeListAction) {
      return false;
    }
  }
  return true;
}
