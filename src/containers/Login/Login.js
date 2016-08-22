import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {LoginForm} from 'components';
import { bindActionCreators } from 'redux';
import {HeroPanel} from 'components';
import {Row} from 'react-bootstrap';

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
      <div>
        <Helmet title="Login"/>
        <HeroPanel isEmpty image="forest.jpeg" />
        <div className={styles.loginPage + ' container'}>
          <Row>
            <div className="column-small">
            <h2>Login</h2>
            <LoginForm formError={error} onSubmit={login} />
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
