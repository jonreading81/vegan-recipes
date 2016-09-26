import crudModuleCreator from '../crud/list';
const viewModule = crudModuleCreator('articles', 'wp-json/wp/v2/posts?categories=2');
export default viewModule;
