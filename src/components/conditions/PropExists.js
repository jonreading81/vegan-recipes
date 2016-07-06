import { Component, PropTypes } from 'react';
import isUndefined from 'lodash/isUndefined';


export default class AdminUser extends Component {

  static propTypes = {
    prop: PropTypes.object,
    children: PropTypes.node
  };

  render() {
    const {prop, children} = this.props;
    if (!isUndefined(prop)) {
      return (children);
    }
    return false;
  }
}

