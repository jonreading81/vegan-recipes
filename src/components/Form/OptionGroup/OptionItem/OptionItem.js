import {Component, PropTypes} from 'react';
import valueStringHelper from 'components/Form/OptionGroup/valueStringHelper';

class OptionItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
    valueStringHelper: PropTypes.object
  }

  static defaultProps = {
    value: '',
    multiValue: false,
    valueStringHelper: Object.create(valueStringHelper,
      {
        delimiterA: {value: '/'},
        delimiterB: {value: ':'}
      }
    )
  }
}

export default OptionItem;

