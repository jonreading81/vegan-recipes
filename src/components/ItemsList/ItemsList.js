import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link } from 'react-router';
import { ResponsiveImage, PromoIcon} from 'components';

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
         <Row className={'promo-item ' + styles.promo}>
          <Link to={item.URL}>
            <Col xs={12} sm={4} md={5}>
              <div className="imageWrapper">
                <PromoIcon type={item.icon}/>
                <div className="imageOverlay"/>
                  <ResponsiveImage image={item.image}/>
              </div>
            </Col>
            <Col xs={12} sm={8} md={7} className={styles.type}>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </Col>
          </Link>
        </Row>
      </For>
      </div>
    );
  }
}
