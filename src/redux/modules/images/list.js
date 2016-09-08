import crudModuleCreator from '../crud/list';
const viewModule = crudModuleCreator('images', '/images/:term/:page');
export default viewModule;

