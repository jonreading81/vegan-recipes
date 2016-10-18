import React, { Component, PropTypes } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default class ButtaNavigation extends Component {

  static propTypes = {
    selected: PropTypes.string.isRequired
  };

  render() {
    const {selected} = this.props;
    return (
      <Nav bsStyle="tabs" justified activeKey={1}>
        <LinkContainer to="/butta">
          <NavItem active={selected === 'about'} eventKey={1}>About</NavItem>
        </LinkContainer>
        <LinkContainer to="butta/label">
          <NavItem active={selected === 'label'} eventKey={2}>Dietary Information</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

