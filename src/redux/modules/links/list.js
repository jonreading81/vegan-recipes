import crudModuleCreator from '../crud/list';
const viewModule = crudModuleCreator('links', '/links/:term/:page');
export default viewModule;

