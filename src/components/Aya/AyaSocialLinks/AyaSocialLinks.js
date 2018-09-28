/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showSubscribeUser as showSubscribeUserAction } from 'redux/modules/mailchimp';

const mapStateToProps = ({mailchimp = {}}) => {
  return {
    displayed: mailchimp.displayed
  };
};

const actions = { showSubscribeUserAction };

class AyaSocialLinks extends Component {

  render() {
    const styles = require('./AyaSocialLinks.scss');
    const {showSubscribeUserAction, displayed} = this.props;
    return (
    <div>
     <section className={styles.socialLinks}>
        <div className={styles.listWrapper}>
            <ul className={`${styles.list} list-inline text-center`}>
                <li>
                  <span
                  onClick={showSubscribeUserAction}
                  className={` ${styles.subscribe} btn ${displayed ? 'hidden' : ''}`}
                  >Join our newsletter</span>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href="https://twitter.com/ayaplantbased">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href="https://instagram.com/ayaplantbased">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href="https://facebook.com/ayaplantbased">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href="mailto:hello@ayaplantbased.com">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </section>
    </div>
    );
  }
}

export default connect(mapStateToProps, actions)(AyaSocialLinks);
