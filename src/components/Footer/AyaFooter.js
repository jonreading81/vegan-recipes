import React, { Component } from 'react';

export default class Footer extends Component {


  static propTypes = {
  }
  render() {
    const styles = require('./AyaFooter.scss');
    return (
    <div>
    <hr />
     <footer className={styles.footer}>
        <div className="container">
            <p className={styles.quote}>“The greatness of a nation and its moral progress can be judged by the way its animals are treated.” <span className="text-muted">Mahatma Gandhi</span></p>
            <div className="row">
                <section>
                <ul className={styles.standards + ' list-inline text-center'}>
                    <li>
                       <div className={styles.organicLogo} />
                    </li>
                    <li>
                       <div className={styles.veganLogo} />
                    </li>
                </ul>
                </section>
            </div>
            <div className="row">
                    <p className={styles.copyright + ' text-muted'}>Copyright © Aya Foods Ltd 2017</p>
            </div>
        </div>
    </footer>
    </div>
    );
  }
}
