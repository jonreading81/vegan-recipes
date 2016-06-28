import {connect} from 'react-redux';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import {batchActions} from 'redux-batched-actions';
import {reset as resetForm} from 'redux-form';
import {resetUpdateRecipe} from 'redux/modules/updateRecipe';
import {push } from 'react-router-redux';
import get from 'lodash/get';
import {getURLWithSlug as getRecipeURL} from 'utils/recipes';

const SuccessConfirmationModal = connect(
  (state) => {
    return {
      show: get(state.updateRecipe, 'isSuccess', false),
      title: 'Recipe Updated'
    };
  },
  (dispatch, params) => {
    return {
      close: () => {
        dispatch(batchActions([resetForm('recipeForm'), resetUpdateRecipe()]));
      },
      confirm: () => {
        dispatch(batchActions([
          resetForm('recipeForm'),
          resetUpdateRecipe()
        ]));
        dispatch(push(getRecipeURL(get(params, 'recipe'))));
      },
    };
  }
)(ConfirmationModal);

export default SuccessConfirmationModal;
