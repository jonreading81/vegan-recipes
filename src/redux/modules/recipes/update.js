import crudModuleCreator from '../crud/update';
import RecipeHelper from 'helpers/Recipe';
const updateModule = crudModuleCreator('recipes', '/recipes/', RecipeHelper.formatFormData);
export default updateModule;
