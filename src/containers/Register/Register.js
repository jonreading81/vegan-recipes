import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {request} from 'redux/modules/register';
import {RegisterForm} from 'components';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import {HeroPanel} from 'components';


@connect(
  (state) => {
    return {
      error: get(state.register, 'loadError'),
      user: get(state.register, 'user'),
      submitting: get(state.register, 'loading')
    };
  },
  (dispatch) => {
    return {
      register: bindActionCreators(request, dispatch)
    };
  }
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    submitting: PropTypes.bool,
    register: PropTypes.func
  }


  render() {
    const {register, error, submitting} = this.props;
    const styles = require('./Register.scss');
    return (
      <div>
      <Helmet title="Register"/>
        <HeroPanel isEmpty image="forest.jpeg" />
        <div className={styles.register + ' container'}>
          <div className="column-small">
          <h2>Register</h2>
           <RegisterForm formError={error} submitting={submitting} onSubmit={register} />
          </div>
        </div>
      </div>
    );
  }
}
