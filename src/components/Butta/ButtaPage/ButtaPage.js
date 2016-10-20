import React, { Component, PropTypes } from 'react';
import {ButtaNavigation} from 'components';

export default class ButtaPage extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.string.isRequired,
    style: PropTypes.string
  };

  render() {
    const {selected, children, style} = this.props;
    const styles = require('./ButtaPage.scss');
    return (
      <div className="presentation">
        <ButtaNavigation selected={selected}/>
        <div className="container-fluid">
          <div className={'col-md-2 ' + styles.wallpaper1} />
          <div className={'col-md-8 ' + styles.contentWrapper + ' ' + style}>
            <h1 className={styles.logo}>Butta</h1>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <div className={'col-md-2 ' + styles.wallpaper2} />
        </div>
      </div>
    );
  }
}

