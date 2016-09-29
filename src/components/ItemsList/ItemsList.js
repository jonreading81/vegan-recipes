import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link } from 'react-router';
import { ResponsiveImage} from 'components';

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
                <p className="icon-promo fa-stack fa-lg">
                  <i className="fa fa-stack-2x"></i>
                  <i className={'fa fa-' + item.icon + ' fa-stack-1x'}></i>
                </p>
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
