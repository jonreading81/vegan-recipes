import crudModuleCreator from '../crud/update';
import Helper from 'helpers/Inspiration';
const updateModule = crudModuleCreator('inspiration', '/inspiration/', Helper.formatFormData);
export default updateModule;
