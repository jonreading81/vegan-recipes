import React, { Component, PropTypes } from 'react';
import CenteredContent from './CenteredContent';

export default class AbsoluteCenteredContent extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    alignCenter: PropTypes.bool
  };

  render() {
    const {children, alignCenter} = this.props;
    const styles = require('./centeredContent.scss');
    return (
      <div className={styles.absoluteWrapper}>
          <CenteredContent children={children} alignCenter={alignCenter}>
            {children}
        </CenteredContent>
      </div>
    );
  }
}
