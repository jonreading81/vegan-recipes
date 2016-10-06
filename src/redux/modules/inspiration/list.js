import crudModuleCreator from '../crud/list';
const viewModule = crudModuleCreator('inspiration', '/inspiration/:term/:page');
export default viewModule;

