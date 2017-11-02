import React, { Component } from 'react';

export default class Footer extends Component {


  static propTypes = {
  }
  render() {
    const styles = require('./AyaFooter.scss');
    console.log(styles);
    return (
    <div>
    <hr />
     <footer className={styles.footer}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p className={styles.copyright + ' text-muted'}>Copyright © Aya Foods Ltd 2017</p>
                </div>
            </div>
        </div>
    </footer>
    </div>
    );
  }
}
