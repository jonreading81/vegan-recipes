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
      user: get(state.register, 'user')
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
    register: PropTypes.func
  }


  render() {
    const {register, error} = this.props;
    return (
      <div>
      <Helmet title="Register"/>
        <HeroPanel image="chocolate-brownie.jpeg" title="Register" subTitle="Enter your Details" />
        <div className="container">
          <RegisterForm formError={error} onSubmit={register} />
        </div>
      </div>
    );
  }
}
