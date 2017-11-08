import React, { Component } from 'react';

export default class AyaSocialLinks extends Component {


  static propTypes = {
  }
  render() {
    const styles = require('./AyaSocialLinks.scss');
    return (
    <div>
     <section className={styles.socialLinks}>
        <div className="">
            <ul className={'list-inline text-center'}>
                <li>
                    <a className="socialLink" href="https://twitter.com/ayaplantbased">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className="socialLink" href="https://instagram.com/ayaplantbased">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className="socialLink" href="mailto:hello@ayaplantbased.com">
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
