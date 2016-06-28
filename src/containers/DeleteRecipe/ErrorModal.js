import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {resetDeleteRecipe} from 'redux/modules/deleteRecipe';
import StatusModal from 'components/Form/StatusModal';

const ErrorModal = connect(
  (state) => {
    return {
      show: state.deleteRecipe.error ? true : false
    };
  },
  (dispatch) => {
    return {
      close: bindActionCreators(resetDeleteRecipe, dispatch)
    };
  }
)(StatusModal);

export default ErrorModal;
