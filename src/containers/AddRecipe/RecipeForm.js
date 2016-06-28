import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {requestAddRecipe} from 'redux/modules/addRecipe';
import {RecipeForm} from 'components';

const AddRecipeForm = connect(
  null,
  (dispatch) => {
    return {
      onSubmit: bindActionCreators(requestAddRecipe, dispatch)
    };
  }
)(RecipeForm);

export default AddRecipeForm;

