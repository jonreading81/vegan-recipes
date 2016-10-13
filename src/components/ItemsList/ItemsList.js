import React, { Component, PropTypes } from 'react';
import {ArticlePromoUnit} from 'components';

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./ItemsList.scss');
    let item;
    return (
        <div>
        <For each="item" of={ this.props.items}>
         <div className={styles.promo}>
           <ArticlePromoUnit title={item.title} URL={item.URL} description={item.description} image={item.image} icon={item.icon} />
        </div>
      </For>
      </div>
    );
  }
}
