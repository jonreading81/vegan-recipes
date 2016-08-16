import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {LoginForm} from 'components';
import { bindActionCreators } from 'redux';
import {HeroPanel} from 'components';
import {Row, Col} from 'react-bootstrap';

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
        <HeroPanel image="forest.jpeg" title="Login" />
        <div className={styles.loginPage + ' container'}>
          <Row>
            <Col sm="6" smOffset="3">
            <h3>Enter your Details</h3>
            <LoginForm formError={error} onSubmit={login} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
