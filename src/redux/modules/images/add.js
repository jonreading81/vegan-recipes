import crudModuleCreator from '../crud/add';
import ImageHelper from 'helpers/Image';
const addModule = crudModuleCreator('images', '/images', ImageHelper.formatFormData);
export default addModule;
