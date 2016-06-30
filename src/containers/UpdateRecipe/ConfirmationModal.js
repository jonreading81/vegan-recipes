import {connect} from 'react-redux';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import {batchActions} from 'redux-batched-actions';
import {push } from 'react-router-redux';
import get from 'lodash/get';
import {getURL as getRecipeURL} from 'utils/recipes';
import {resetUpdateRecipe} from 'redux/modules/updateRecipe';

const SuccessConfirmationModal = connect(
  (state) => {
    return {
      recipe: state.updateRecipe.recipe,
      show: get(state.updateRecipe, 'isSuccess', false)
    };
  },
  (dispatch) => {
    return {
      close: () => {
        dispatch(batchActions([
          resetUpdateRecipe()
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
