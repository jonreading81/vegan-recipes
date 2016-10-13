import React, { Component, PropTypes } from 'react';

export default class CenteredContent extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    alignCenter: PropTypes.bool
  };

  render() {
    const {children, alignCenter} = this.props;
    const styles = require('./centeredContent.scss');
    return (
      <div className={styles.wrapper}>
          <div className={alignCenter ? styles.content + ' ' + styles.alignCenter : styles.content }>
            {children}
        </div>
      </div>
    );
  }
}
