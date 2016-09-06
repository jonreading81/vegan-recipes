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
          <Col xs={12} sm={6} md={4} className={'promo-item ' + styles.promo}>
            <div className="imageWrapper">
             <p className="icon-recipe fa-stack fa-lg">
              <i className="fa fa-stack-2x"></i>
              <i className="fa fa-cutlery fa-stack-1x"></i>
            </p>
            <div className="imageOverlay"/>
              <ResponsiveImage image={item.image}/>
            </div>
            <div className={styles.copy}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </Col>
          </Link>
          {(index + 1) % 2 === 0 ? <div className="clearfix visible-sm-block"></div> : null }
          {(index + 1) % 3 === 0 ? <div className="clearfix visible-md-block visible-lg-block"></div> : null }
        </For>
      </Row>
    );
  }
}
