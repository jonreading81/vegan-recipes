import crudModuleCreator from '../crud/add';
import {formatFormData} from './utils';
const addModule = crudModuleCreator('recipes', '/recipes', formatFormData);
export default addModule;
