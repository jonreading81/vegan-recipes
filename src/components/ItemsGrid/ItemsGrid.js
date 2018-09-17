import React, { Component, PropTypes } from 'react';
import {Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {ImagePromoUnit, AyaImageArticlePromoUnit, AyaImageProductPromoUnit, AdminUser} from 'components';

export default class ItemsGrid extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    hasAdminActions: PropTypes.bool,
    gridColLg: PropTypes.number,
    gridColMd: PropTypes.number,
    gridColSm: PropTypes.number,
    gridColXs: PropTypes.number,
    promoStyles: PropTypes.object,
    PromoUnitType: PropTypes.string
  };

  static defaultProps = {
    gridColLg: 4,
    gridColMd: 4,
    gridColSm: 6,
    gridColXs: 12,
    promoUnitType: 'callOfTheForest'
  };

  render() {
    const {promoUnitType, hasAdminActions, promoStyles, gridColLg, gridColMd, gridColSm, gridColXs} = this.props;
    const styles = require('./ItemsGrid.scss');
    let item;
    let index;
    const promoTypes = {
      callOfTheForest: ImagePromoUnit,
      ayaArticle: AyaImageArticlePromoUnit,
      ayaProduct: AyaImageProductPromoUnit
    };
    const PromoUnitComponent = promoTypes[promoUnitType];
    return (
      <Row>
        <For each="item" index="index" of={ this.props.items}>
          <Col xs={gridColXs} sm={gridColSm} md={gridColMd} lg={gridColLg} className={styles.promo}>
            <PromoUnitComponent
                title={item.title}
                URL={item.URL}
                description={item.description}
                image={item.image}
                icon={item.icon}
                color={item.color}
                styles={promoStyles}
            />
            <AdminUser>
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
            </AdminUser>
          </Col>
          {(index + 1) % 2 === 0 ? <div className="clearfix visible-sm-block"></div> : null }
          {(index + 1) % 3 === 0 ? <div className="clearfix visible-md-block visible-lg-block"></div> : null }
        </For>
      </Row>
    );
  }
}
