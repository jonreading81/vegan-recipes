import React, { Component, PropTypes } from 'react';
import {LoggedInUser, NotLoggedInUser} from 'components';
import { connect } from 'react-redux';
import config from '../../config';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, NavItem } from 'react-bootstrap';
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
    const {URL} = this.props;
    console.log(URL.search('recipe'));
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
               <LinkContainer active={URL.search('recipe') !== -1 && URL !== '/recipe/add' } to="/recipe/list/all">
                  <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={1}>Recipes</NavItem>
                </LinkContainer>
                <LoggedInUser>
                  <LinkContainer to="/recipe/add">
                    <NavItem onClick={ this.onNavItemClick } eventKey={2}>Add Recipe</NavItem>
                  </LinkContainer>
                </LoggedInUser>
                <NotLoggedInUser>
                    <LinkContainer to="/login">
                      <NavItem onClick={ this.onNavItemClick } eventKey={3}>Login</NavItem>
                    </LinkContainer>
                </NotLoggedInUser>
                <LoggedInUser>
                  <LinkContainer to="/logout">
                    <NavItem eventKey={3} className="logout-link" onClick={this.handleLogout}>
                      Logout
                    </NavItem>
                  </LinkContainer>
                </LoggedInUser>
                <NotLoggedInUser>
                  <LinkContainer to="/register">
                    <NavItem onClick={ this.onNavItemClick } eventKey={4}>Register</NavItem>
                  </LinkContainer>
                </NotLoggedInUser>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}
