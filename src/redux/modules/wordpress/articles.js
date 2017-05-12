import crudModuleCreator from '../crud/list';
import {getDefaultReducerActions} from '../crud/utils';

function parseURL(path, search, page ) {
  let requestPath;
  let term;
  const catergory = search[0];
  const searchTerm = search[1];
  if (searchTerm === 'all') {
    term = '';
  }else {
    term = searchTerm;
  }
  requestPath = path.replace(':term', term);
  requestPath = requestPath.replace(':page', page);
  requestPath = requestPath.replace(':catergory', catergory);
  return requestPath;
}

const viewModule = crudModuleCreator('articles', 'wp-json/posts?categories=:catergory&per_page=12&page=:page&search=:term', getDefaultReducerActions, parseURL);
export default viewModule;
