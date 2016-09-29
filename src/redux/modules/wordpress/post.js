import crudModuleCreator from '../crud/view';
const viewModule = crudModuleCreator('articles', 'wp-json/posts?slug=');
export default viewModule;
