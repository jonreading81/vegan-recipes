import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import ErrorModal from 'components/Form/ErrorModal';

const ValidationErrorModal = connect(
  (state) => {
    return {
      show: state.addRecipe.error ? true : false
    };
  },
  (dispatch) => {
    return {
      close: bindActionCreators(resetAddRecipe, dispatch)
    };
  }
)(ErrorModal);

export default ValidationErrorModal;
