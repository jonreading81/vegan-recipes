import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../../ayaConfig';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {AyaSocialLinks} from 'components';


@connect(
  (state) => {
    return {
      URL: state.routing.locationBeforeTransitions.pathname
    };
  }
)
export default class NavBar extends Component {


  static propTypes = {
    URL: PropTypes.string.isRequired
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
   <Navbar fixedTop className={`aya-navbar-default ${styles.navbar} navbar-custom`} fluid onToggle={ this.onNavbarToggle } expanded={ this.state.navExpanded } >
      <Navbar.Header className={`${styles.navbarHeader}`}>
        <Navbar.Toggle className={`${styles.navbarToggle}`}/>
        <AyaSocialLinks/>
        <Navbar.Brand className={`${styles.navbarBrand}`}>
          <IndexLink to="/aya">
            <div className={`${styles.logoImg}`} />
            <div className="image-wrapper">
            </div>
            <span className="hidden">{config.app.title}</span>
          </IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse autoCollapse eventKey={0} className={`${styles.navbarCollapse}`}>
        <Nav navbar className={`${styles['navbar-nav']}`}>
        	<LinkContainer to="/aya/">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/aya/products">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={2}>Products</NavItem>
            </LinkContainer>
            <LinkContainer to="/aya/ourstory">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={2}>Our Story</NavItem>
            </LinkContainer>
            <LinkContainer to="/aya/contact">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={3}>Contact</NavItem>
            </LinkContainer>
            <LinkContainer to="/aya/article/list">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={4}>Articles</NavItem>
            </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}
