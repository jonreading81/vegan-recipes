import React, {Component, PropTypes} from 'react';
import OptionItemFacade from 'components/Form/OptionGroup/OptionItem/Facade';
import valueStringHelper from 'components/Form/OptionGroup/valueStringHelper';

class OptionGroup extends Component {

  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    multiValue: PropTypes.bool,
    onChange: PropTypes.func,
    valueStringHelper: PropTypes.object
  }

  static defaultProps = {
    value: '',
    multiValue: false,
    valueStringHelper : Object.create(valueStringHelper,
      {
        delimiterA: {value: '/'},
        delimiterB: {value:  ':'}
      }
    )
  }

  constructor(props) {
    super(props);
  }

  onItemChanged(id, value) {
    const newValue = this.props.multiValue ? this.props.valueStringHelper.getMultiValueString(this.props.value, id, value) : this.props.valueStringHelper.getItemValueString(id, value);
    this.props.onChange(newValue);
  }

  render() {
    const {children, value} = this.props;
    const newChildren = React.Children.map(children, (child) => {
      return (
        <OptionItemFacade value={value} onChange={this.onItemChanged.bind(this)}>{child}</OptionItemFacade>
      );
    });
    return (
      <div>{newChildren}</div>
    );
  }

}

export default OptionGroup;
