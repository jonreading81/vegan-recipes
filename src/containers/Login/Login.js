import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {LoginForm} from 'components';
import { bindActionCreators } from 'redux';

@connect(
  (state) => {
    return {
      error: state.auth.loginError
    };
  },
  (dispatch) => {
    return {
      login: bindActionCreators(authActions.login, dispatch)
    };
  }
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }


  render() {
    const {login, error} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        <LoginForm formError={error} onSubmit={login} />
      </div>
    );
  }
}
