import React, { Component, PropTypes } from 'react';
import {LoggedInUser, NotLoggedInUser, AdminUser, NotAdminUser} from 'components';
import { connect } from 'react-redux';
import config from '../../config';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {logout } from 'redux/modules/auth';

@connect(
  (state) => {
    return {
      URL: state.routing.locationBeforeTransitions.pathname
    };
  },
  {logout}
)
export default class NavBar extends Component {


  static propTypes = {
    logout: PropTypes.func.isRequired,
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
          <IndexLink to="/">
            <div className={styles.brand}/>
            <span>{config.app.title}</span>
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse autoCollapse eventKey={0}>
        <Nav navbar className="navbar-right">

         <LinkContainer to="/yoga/jon-reading/">
            <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={1}>Yoga</NavItem>
          </LinkContainer>

           <NavDropdown eventKey={2} title="Recipes" id="recipes-dropdown">
            <LinkContainer to="/recipe/list/all">
              <MenuItem onClick={ this.onNavItemClick } eventKey={2.1}>List</MenuItem>
            </LinkContainer>
            <LinkContainer to="/recipe/add">
              <MenuItem onClick={ this.onNavItemClick } eventKey={2.2}>Add</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <LinkContainer to="/article/list/all">
            <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={3}>Articles</NavItem>
          </LinkContainer>

          <NavDropdown eventKey={4} title="Inspiration" id="inspiration-dropdown">
            <LinkContainer to="/inspiration/list/all">
              <MenuItem onClick={ this.onNavItemClick } eventKey={4.2}>List</MenuItem>
            </LinkContainer>
            <LinkContainer to="/inspiration/add">
              <MenuItem onClick={ this.onNavItemClick } eventKey={4.3}>Add</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <NotAdminUser>
             <LinkContainer to="/link/list/all">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={5}>Links</NavItem>
            </LinkContainer>
          </NotAdminUser>

          <AdminUser>
           <NavDropdown eventKey={5} title="Links" id="links-dropdown">
            <LinkContainer to="/link/list/all">
              <MenuItem onClick={ this.onNavItemClick } eventKey={5.1}>List</MenuItem>
            </LinkContainer>
            <LinkContainer to="/link/add">
              <MenuItem onClick={ this.onNavItemClick } eventKey={5.3}>Add</MenuItem>
            </LinkContainer>
          </NavDropdown>
          </AdminUser>
          <AdminUser>
            <NavDropdown eventKey={6} title="Images" id="images-dropdown">
              <LinkContainer to="/images/list/all">
                <MenuItem onClick={ this.onNavItemClick } eventKey={6.1}>List</MenuItem>
              </LinkContainer>
              <LinkContainer to="/images/add">
                <MenuItem onClick={ this.onNavItemClick } eventKey={6.2}>Add</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </AdminUser>

          <NotLoggedInUser>
            <LinkContainer to="/login">
              <NavItem onClick={ this.onNavItemClick } eventKey={7}>Login</NavItem>
            </LinkContainer>
          </NotLoggedInUser>

          <NotLoggedInUser>
            <LinkContainer to="/register">
              <NavItem onClick={ this.onNavItemClick } eventKey={8}>Register</NavItem>
            </LinkContainer>
          </NotLoggedInUser>

          <LoggedInUser>
            <LinkContainer to="/logout">
              <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                Logout
              </NavItem>
            </LinkContainer>
          </LoggedInUser>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}
