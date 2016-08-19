import React, { Component, PropTypes } from 'react';
import {Row, Col } from 'react-bootstrap';
import {Link } from 'react-router';
import { ResponsiveImage} from 'components';

export default class ItemsGrid extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const styles = require('./ItemsGrid.scss');
    let item;
    let index;
    return (
      <Row>
        <For each="item" index="index" of={ this.props.items}>
          <Link to={item.URL}>
          <Col xs={6} md={4} className={styles.promo}>
            <ResponsiveImage image={item.image}/>
            <div className={styles.copy}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </Col>
          </Link>
          <If condition={index === 1}>
            <div className="clearfix visible-xs-block"></div>
          </If>
          <If condition={index === 2}>
            <div className="clearfix visible-md-block visible-lg-block"></div>
          </If>
        </For>
      </Row>
    );
  }
}
