import React, { Component, PropTypes } from 'react';
import {Link } from 'react-router';
import {Col, Row} from 'react-bootstrap';
import { ResponsiveImage, IconButton} from 'components';

export default class ArticlePromoUnit extends Component {

  static propTypes = {
    image: PropTypes.string,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired
  };

  render() {
    const {title, description, image, icon, URL} = this.props;
    const styles = require('./promoUnit.scss');
    const articleStyles = require('./articlePromoUnit.scss');
    return (
      <div className={styles.promoUnit}>
       <Link to={URL}>
          <Row>
            <Col xs={12} sm={4} md={5}>
              <div className={styles.imageWrapper}>
                <IconButton type={icon} styles={styles}/>
                <div className={styles.imageOverlay}/>
                  <ResponsiveImage image={image}/>
              </div>
            </Col>
            <Col xs={12} sm={8} md={7} className={articleStyles.type}>
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </Col>
          </Row>
        </Link>
      </div>
    );
  }
}