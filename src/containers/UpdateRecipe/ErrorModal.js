import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {resetUpdateRecipe} from 'redux/modules/updateRecipe';
import StatusModal from 'components/Form/StatusModal';

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
)(StatusModal);

export default ValidationErrorModal;
