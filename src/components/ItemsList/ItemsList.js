import React, { Component, PropTypes } from 'react';
import {ArticlePromoUnit} from 'components';

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./ItemsList.scss');
    let item;
    let index;
    return (
        <div>
        <For each="item" index="index" of={ this.props.items}>
         <div key={'item' + index} className={styles.promo}>
           <ArticlePromoUnit title={item.title} URL={item.URL} description={item.description} image={item.image} icon={item.icon} />
        </div>
      </For>
      </div>
    );
  }
}
