import crudModuleCreator from '../crud/view';
const viewModule = crudModuleCreator('articles', 'wp-json/pages?slug=');
export default viewModule;
