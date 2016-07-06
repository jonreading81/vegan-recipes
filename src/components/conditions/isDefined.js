import { Component, PropTypes } from 'react';

export default class isDefined extends Component {

  static propTypes = {
    param: PropTypes.object,
    children: PropTypes.node
  };

  render() {
    const {param, children} = this.props;
    if (param) {
      return (children);
    }
    return false;
  }
}

