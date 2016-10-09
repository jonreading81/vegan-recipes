import React, { Component, PropTypes } from 'react';
import { Inspiration, IconButton} from 'components';
import ViewHelper from 'helpers/Inspiration';

export default class InspirationSlideshow extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      itemIndex: 0
    };
  }

  showNext() {
    let index = this.state.itemIndex + 1;
    if (index === this.props.items.length) {
      index = 0;
    }
    this.setState({ itemIndex: index});
  }

  showPrevious() {
    let index = this.state.itemIndex - 1;
    if (index < 0) {
      index = this.props.items.length - 1;
    }
    this.setState({ itemIndex: index});
  }

  render() {
    const {items} = this.props;
    const myHelper = new ViewHelper(items[this.state.itemIndex]);
    const styles = require('./InspirationSlideshow.scss');
    return (
      <div className={styles.container}>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigation}>
          <div className={styles.iconWrapper}>
            <IconButton onClick={::this.showPrevious} type="arrow-left" style={styles.previous}/>
            <IconButton onClick={::this.showNext} type="arrow-right" style={styles.next}/>
          </div>
        </div>
      </div>
      <Inspiration title={myHelper.getTitle()} image={myHelper.getImage()} quote={myHelper.getQuote()} author={myHelper.getQuoteAuthor()} showQuote/>
      </div>
    );
  }
}

