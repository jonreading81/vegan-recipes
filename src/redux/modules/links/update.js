import crudModuleCreator from '../crud/update';
import Helper from 'helpers/Link';
const updateModule = crudModuleCreator('links', '/links/', Helper.formatFormData);
export default updateModule;
