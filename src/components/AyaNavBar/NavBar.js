import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../../ayaConfig';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, NavItem} from 'react-bootstrap';


@connect(
  (state) => {
    return {
      URL: state.routing.locationBeforeTransitions.pathname
    };
  }
)
export default class NavBar extends Component {


  static propTypes = {
    URL: PropTypes.string.isRequired,
  }

  state = {
    navExpanded: false
  }

  onNavItemClick = () => {
    this.setState({ navExpanded: false });
  }

  onNavbarToggle = () => {
    this.setState({ navExpanded: ! this.state.navExpanded });
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = require('./NavBar.scss');
    // const {URL} = this.props;
    return (
   <Navbar fixedTop className="navbar-custom" fluid onToggle={ this.onNavbarToggle } expanded={ this.state.navExpanded } >
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/aya">
            <div className={styles.brand}/>
            <span>{config.app.title}</span>
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse autoCollapse eventKey={0}>
        <Nav navbar className="navbar-right">
            <LinkContainer to="/aya/about">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={1}>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/aya/articles">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={2}>Articles</NavItem>
            </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}
