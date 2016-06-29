import {connect} from 'react-redux';
import {requestUpdateRecipe} from 'redux/modules/updateRecipe';
import {RecipeForm} from 'components';
import get from 'lodash/get';

export default connect(
  (store) => {
    return {
      initialValues: store.viewRecipe.recipe,
      recipe: store.viewRecipe.recipe
    };
  },
  (dispatch) => {
    return {
      onSubmit: (id, data) => {
        dispatch(requestUpdateRecipe(id, data));
      }
    };
  },
  (stateProps, dispatchProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      onSubmit: (data) => {
        dispatchProps.onSubmit(get(stateProps.recipe, '_id'), data);
      }
    };
  }
)(RecipeForm);
