import React, { Component, PropTypes } from 'react';
import {ArticlePromoUnit} from 'components';
const styles = require('./ItemsList.scss');

export default class ItemsList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    promoStyles: PropTypes.object,
  };

  render() {
    const {promoStyles} = this.props;
    let item;
    let index;
    return (
        <div>
        <For each="item" index="index" of={ this.props.items}>
         <div key={'item' + index} className={styles.promo}>
           <ArticlePromoUnit
               title={item.title}
               URL={item.URL}
               description={item.description}
               image={item.image}
               icon={item.icon}
               styles={promoStyles}
           />
        </div>
      </For>
      </div>
    );
  }
}
