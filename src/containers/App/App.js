import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {getStatus, isLoaded as isAPILoaded } from 'redux/modules/api';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import {Error} from 'containers';
import {Footer, NavBar} from 'components';
import get from 'lodash/get';
import config from '../../config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    if (!isAPILoaded(getState())) {
      promises.push(dispatch(getStatus()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    apiError: state.api.error
  }),
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    apiError: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const {apiError} = this.props;
    const styles = require('./App.scss');
    return (
        <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <NavBar />
        <div className={styles.appContent}>
         {!apiError ? this.props.children : <Error code="500"><h2>{get(apiError, 'name')}</h2><p>{get(apiError, 'message')}</p></Error > }
        </div>
         <Footer />
      </div>
      );
  }
}
