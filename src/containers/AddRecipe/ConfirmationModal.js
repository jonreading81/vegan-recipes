import {connect} from 'react-redux';
import ConfirmationModal from 'components/Form/ConfirmationModal';
import {batchActions} from 'redux-batched-actions';
import {reset as resetForm} from 'redux-form';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import {push } from 'react-router-redux';
import get from 'lodash/get';
import {getURLWithSlug as getRecipeURL} from 'utils/recipes';

const SuccessConfirmationModal = connect(
  (state) => {
    return {
      show: get(state.addRecipe, 'isSuccess', false),
      title: 'Recipe Added'
    };
  },
  (dispatch, params) => {
    return {
      close: () => {
        dispatch(batchActions([resetForm('recipeForm'), resetAddRecipe()]));
      },
      confirm: () => {
        dispatch(batchActions([
          resetForm('recipeForm'),
          resetAddRecipe()
        ]));
        dispatch(push(getRecipeURL(get(params, 'recipe'))));
      },
    };
  }
)(ConfirmationModal);

export default SuccessConfirmationModal;
