import React, { Component, PropTypes } from 'react';
import {Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {ImagePromoUnit} from 'components';

export default class ItemsGrid extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    hasAdminActions: PropTypes.bool
  };

  render() {
    const {hasAdminActions} = this.props;
    const styles = require('./ItemsGrid.scss');
    let item;
    let index;
    return (
      <Row>
        <For each="item" index="index" of={ this.props.items}>
          <Col xs={12} sm={6} md={4} className={styles.promo}>
            <ImagePromoUnit title={item.title} URL={item.URL} description={item.description} image={item.image} icon={item.icon} />
            <If condition={hasAdminActions}>
              <ButtonToolbar className={styles.adminToolbar}>
              <LinkContainer to={item.updateURL}>
                <Button bsStyle="primary" bsSize="large" >Update</Button>
              </LinkContainer>
              <LinkContainer to={item.deleteURL}>
                <Button bsStyle="primary" bsSize="large" >Delete</Button>
              </LinkContainer>
              </ButtonToolbar>
            </If>
          </Col>
          {(index + 1) % 2 === 0 ? <div className="clearfix visible-sm-block"></div> : null }
          {(index + 1) % 3 === 0 ? <div className="clearfix visible-md-block visible-lg-block"></div> : null }
        </For>
      </Row>
    );
  }
}
