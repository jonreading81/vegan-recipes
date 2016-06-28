import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {resetAddRecipe} from 'redux/modules/addRecipe';
import StatusModal from 'components/Form/StatusModal';

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
)(StatusModal);

export default ValidationErrorModal;
