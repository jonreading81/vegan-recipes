import {connect} from 'react-redux';
import {push } from 'react-router-redux';
import get from 'lodash/get';
import StatusModal from 'components/Form/StatusModal';

const SuccessModal = connect(
  (state) => {
    return {
      show: get(state.deleteRecipe, 'isSuccess', false)
    };
  },
  (dispatch) => {
    return {
      close: () => {
        dispatch(push('recipe/list'));
      }
    };
  }
)(StatusModal);

export default SuccessModal;

