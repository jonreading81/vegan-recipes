import crudModuleCreator from '../crud/update';
import ImageHelper from 'helpers/Image';
const updateModule = crudModuleCreator('images', '/images/', ImageHelper.formatFormData);
export default updateModule;
