import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {resetUpdateRecipe} from 'redux/modules/updateRecipe';
import ErrorModal from 'components/Form/ErrorModal';

const ValidationErrorModal = connect(
  (state) => {
    return {
      show: state.updateRecipe.error ? true : false
    };
  },
  (dispatch) => {
    return {
      close: bindActionCreators(resetUpdateRecipe, dispatch)
    };
  }
)(ErrorModal);

export default ValidationErrorModal;
