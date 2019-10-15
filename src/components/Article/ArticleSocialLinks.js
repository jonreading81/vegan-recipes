import React, { Component } from 'react';

export default class ArticleSocialLinks extends Component {

  render() {
    const {domain, url} = this.props;
    const styles = require('./ArticleSocialLinks.scss');
    const twitterUrl = 'https://twitter.com/share?URL=http://' + domain + url;
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=http://' + domain + url;
    return (

    <div>
     <section className={styles.socialLinks}>
        <div className="">
            <ul className={'list-inline text-center'}>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href={twitterUrl} target="blank">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href={facebookUrl} target="blank">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
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
