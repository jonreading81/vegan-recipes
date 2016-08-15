export default function(prevLocation, location) {
  if (prevLocation &&
    prevLocation.pathname.search('recipe/list') === 1 &&
    location.pathname.search('recipe/list') === 1
    ) {
    return false;
  }
  return true;
}
