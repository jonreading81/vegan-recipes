import crudModuleCreator from '../crud/add';
import Helper from 'helpers/Link';
const addModule = crudModuleCreator('links', '/links', Helper.formatFormData);
export default addModule;
