import {connect} from 'react-redux';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import {batchActions} from 'redux-batched-actions';
import {reset as resetForm} from 'redux-form';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import {push } from 'react-router-redux';
import get from 'lodash/get';
import {getURL as getRecipeURL} from 'utils/recipes';

const SuccessConfirmationModal = connect(
  (state) => {
    return {
      recipe: state.addRecipe.recipe,
      show: get(state.addRecipe, 'isSuccess', false)
    };
  },
  (dispatch) => {
    return {
      close: () => {
        dispatch(batchActions([
          resetForm('recipeForm'),
          resetAddRecipe()
        ]));
      },
      confirm: (recipe) => {
        dispatch(push(getRecipeURL(recipe)));
      },
    };
  },
  (stateProps, dispatchProps, componentProps) => {
    return {
      ...componentProps,
      ...stateProps,
      ...dispatchProps,
      confirm: () => {
        dispatchProps.confirm(stateProps.recipe);
      }
    };
  }
)(ConfirmationModal);

export default SuccessConfirmationModal;
