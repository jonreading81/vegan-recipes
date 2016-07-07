import crudModuleCreator from '../crud/update';
import {formatFormData} from './utils';
const updateModule = crudModuleCreator('recipes', '/recipes/', formatFormData);
export default updateModule;
