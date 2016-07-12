import crudModuleCreator from '../crud/add';
import RecipeHelper from 'helpers/Recipe';
const addModule = crudModuleCreator('recipes', '/recipes', RecipeHelper.formatFormData);
export default addModule;
