import crudModuleCreator from '../crud/list';
const viewModule = crudModuleCreator('recipes', '/recipes/:term/:page');
export default viewModule;

