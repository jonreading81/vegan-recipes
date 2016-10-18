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
      <div>
        <ButtaNavigation selected={selected}/>
        <div className="container">
          <h1 className={styles.logo}>Butta</h1>
          <div className={style}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

