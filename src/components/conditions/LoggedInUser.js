import { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import UserHelper from 'helpers/User';


@connect(
  (state) => {
    return {
      user: new UserHelper(state.auth.user)
    };
  }
)
export default class LoggedInUser extends Component {

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node
  };

  render() {
    const {user, children} = this.props;
    if (user.isLoggedIn()) {
      return (children);
    }
    return false;
  }
}

