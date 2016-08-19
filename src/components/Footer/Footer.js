import React, { Component } from 'react';

export default class Footer extends Component {


  static propTypes = {
  }
  render() {
    const styles = require('./Footer.scss');
    return (
    <div>
    <hr />
     <footer className={styles.footer}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <ul className={'list-inline text-center'}>
                        <li>
                            <a className={styles.socialLink} href="https://twitter.com/calloftheforest">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className={styles.socialLink} href="mailto:amy@calloftheforest.com">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className={styles.socialLink} href="https://github.com/jonreading81/vegan-recipes">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <p className={styles.copyright + ' text-muted'}>Copyright © Call of the Forest 2016</p>
                </div>
            </div>
        </div>
    </footer>
    </div>
    );
  }
}
