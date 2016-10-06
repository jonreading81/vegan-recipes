import crudModuleCreator from '../crud/add';
import Helper from 'helpers/Inspiration';
const addModule = crudModuleCreator('inspiration', '/inspiration', Helper.formatFormData);
export default addModule;
