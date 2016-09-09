import React, { Component, PropTypes } from 'react';
import {Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import {Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { ResponsiveImage} from 'components';

export default class ItemsGrid extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    hasAdminActions: PropTypes.bool.isRequired
  };

  render() {
    const {hasAdminActions} = this.props;
    const styles = require('./ItemsGrid.scss');
    let item;
    let index;
    return (
      <Row>
        <For each="item" index="index" of={ this.props.items}>
          <Col xs={12} sm={6} md={4} className={'promo-item ' + styles.promo}>
            <Link to={item.URL}>
            <div>
              <div className="imageWrapper">
               <p className="icon-promo fa-stack fa-lg">
                <i className="fa fa-stack-2x"></i>
                <i className={'fa fa-' + item.icon + ' fa-stack-1x'}></i>
              </p>
              <div className="imageOverlay"/>
                <ResponsiveImage image={item.image}/>
              </div>
              <div className={styles.copy}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
             </Link>
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
