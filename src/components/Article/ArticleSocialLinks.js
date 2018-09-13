import React, { PropTypes, Component } from 'react';

export default class ArticleSocialLinks extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    const {url} = this.props;
    const styles = require('./ArticleSocialLinks.scss');
    const twitterUrl = 'https://twitter.com/share?URL=' + url;
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    return (

    <div>
     <section className={styles.socialLinks}>
        <div className="">
            <ul className={'list-inline text-center'}>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href={twitterUrl}>
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li>
                    <a className={styles.socialLink + ' socialLink'} href={facebookUrl}>
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
