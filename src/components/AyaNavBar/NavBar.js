import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../../ayaConfig';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {AyaSocialLinks, MailchimpSubscription} from 'components';


const mapStateToProps = ({ routing }) => {
  return {
    URL: routing.locationBeforeTransitions.pathname
  };
};

@connect(mapStateToProps)
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
    const {URL} = this.props;
    return (
   <Navbar fixedTop className={`aya-navbar-default ${styles.navbar} navbar-custom`} fluid onToggle={ this.onNavbarToggle } expanded={ this.state.navExpanded } >
    <MailchimpSubscription title="Newsletter" listId="bec0c373cc" />
      <Navbar.Header className={`${styles.navbarHeader}`}>
        <Navbar.Toggle className={`${styles.navbarToggle}`}/>
        <AyaSocialLinks/>
        <Navbar.Brand className={`${styles.navbarBrand}`}>
          <div className="aya-logo-background image-wrapper">
              <div className={`${styles.logoBg}`}>
              </div>
              <div className="image-wrapper-holder" />
              <div className="image-wrapper-overlay" />
              <IndexLink to="/aya" className="logoLink">
                <div className={`${styles.logoImg}`}>
                </div>
                <div className="image-wrapper">
                </div>
                <span className="hidden">{config.app.title}</span>
                <span className="aya-strapline">{config.app.strapline}</span>
              </IndexLink>
          </div>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse autoCollapse eventKey={0} className={`${styles.navbarCollapse}`}>
        <Nav navbar className={`${styles['navbar-nav']}`}>
        	<LinkContainer active={URL === '/aya'} to="/aya">
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
            <LinkContainer to="/aya/articles">
              <NavItem autoCollapse onClick={ this.onNavItemClick } eventKey={4}>Articles</NavItem>
            </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}
