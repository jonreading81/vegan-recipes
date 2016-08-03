import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import {getStatus, isLoaded as isAPILoaded } from 'redux/modules/api';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import {Error} from 'containers';
import UserHelper from 'helpers/User';
import {LoggedInUser, NotLoggedInUser} from 'components';
import get from 'lodash/get';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    if (!isAPILoaded(getState())) {
      promises.push(dispatch(getStatus()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    apiError: state.api.error
  }),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    apiError: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    navExpanded: false
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
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
  };

  render() {
    const {user, apiError} = this.props;
    const styles = require('./App.scss');
    const myUserHelper = new UserHelper(user);
    return (
        <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop onToggle={ this.onNavbarToggle } expanded={ this.state.navExpanded } >
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
            <Nav navbar>
             <LinkContainer to="/recipe/list/all">
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
            <LoggedInUser>
              <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{myUserHelper.getFullName()}</strong>.</p>
            </LoggedInUser>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
         {!apiError ? this.props.children : <Error code="500"><h2>{get(apiError, 'name')}</h2><p>{get(apiError, 'message')}</p></Error > }
        </div>
      </div>
      );
  }
}
