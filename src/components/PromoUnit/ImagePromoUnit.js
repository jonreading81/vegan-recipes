import React, { Component, PropTypes } from 'react';
import {Link } from 'react-router';
import { ResponsiveImage, IconButton, AbsoluteCenteredContent} from 'components';

export default class ImagePromoUnit extends Component {

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
    return (
      <div className={styles.promoUnit}>
       <Link to={URL}>
        <div className={styles.imageWrapper}>
          <IconButton type={icon} styles={styles}/>
          <div className={styles.imageOverlay}/>
           <If condition={image && image !== ''}>
            <ResponsiveImage image={image}/>
          </If>
          <If condition={!image || image === ''}>
            <AbsoluteCenteredContent alignCenter>
              <h4 className={styles.textImage}>{title}</h4>
            </AbsoluteCenteredContent>
          </If>
        </div>
        <div className={styles.copy}>
          <If condition={image && image !== ''}>
             <h4>{title}</h4>
          </If>
          <p>{description}</p>
        </div>
        </Link>
      </div>
    );
  }
}
