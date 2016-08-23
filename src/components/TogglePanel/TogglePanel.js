import React, { Component, PropTypes } from 'react';
import {Panel} from 'react-bootstrap';


export default class TogglePanel extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isExpanded: PropTypes.bool
  };

  constructor(...args) {
    super(...args);
    this.state = {
      isExpanded: args[0].isExpanded
    };
  }
  render() {
    const {title, children} = this.props;
    const styles = require('./TogglePanel.scss');
    return (
        <div>
          <h2 className={styles.heading} onClick={ ()=> this.setState({ isExpanded: !this.state.isExpanded })} ><i className={!this.state.isExpanded ? 'fa fa-chevron-down' : 'fa fa-chevron-up'} />{title}:</h2>
          <Panel collapsible expanded={this.state.isExpanded}>{children}</Panel>
        </div>
    );
  }
}

