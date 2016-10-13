import React, { Component, PropTypes } from 'react';
import CenteredContent from './CenteredContent';

export default class AbsoluteCenteredContent extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    alignCenter: PropTypes.bool,
    styles: PropTypes.object
  };

  render() {
    const {children, alignCenter} = this.props;
    const _styles = {
      absoluteWrapper: '',
      ...this.props.styles
    };
    const styles = require('./centeredContent.scss');
    return (
      <div className={styles.absoluteWrapper + ' ' + _styles.absoluteWrapper}>
          <CenteredContent children={children} alignCenter={alignCenter}>
            {children}
        </CenteredContent>
      </div>
    );
  }
}
