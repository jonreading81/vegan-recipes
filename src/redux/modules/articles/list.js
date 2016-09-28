import crudModuleCreator from '../crud/list';
import {getDefaultReducerActions} from '../crud/utils';

function parseURL(path, searchTerm, page ) {
  let term;
  let requestPath;
  if (searchTerm === 'all') {
    term = '';
  }else {
    term = searchTerm;
  }
  requestPath = path.replace(':term', term);
  requestPath = requestPath.replace(':page', page);
  return requestPath;
}

const viewModule = crudModuleCreator('articles', 'wp-json/posts?categories=2&per_page=12&page=:page&search=:term', getDefaultReducerActions, parseURL);
export default viewModule;
