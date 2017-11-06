import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Error} from 'containers';
import get from 'lodash/get';
import config from '../../ayaConfig';
import {AyaNavBar, AyaFooter} from 'components';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    apiError: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {apiError} = this.props;
    const styles = require('./AyaApp.scss');
    return (
        <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <AyaNavBar />
        <div className={styles.appContent}>
         {!apiError ? this.props.children : <Error code="500"><h2>{get(apiError, 'name')}</h2><p>{get(apiError, 'message')}</p></Error > }
        </div>
        <AyaFooter />
      </div>
      );
  }
}
