import {connect} from 'react-redux';
import {requestUpdateRecipe} from 'redux/modules/updateRecipe';
import {RecipeForm} from 'components';
import get from 'lodash/get';

export default connect(
  (store) => {
    return {
      initialValues: store.viewRecipe.recipe
    };
  },
  (dispatch, params) => {
    return {
      onSubmit: (data) => {
        console.log(data);
        dispatch(requestUpdateRecipe(get(params, 'recipe'), data));
      }
    };
  }
)(RecipeForm);
