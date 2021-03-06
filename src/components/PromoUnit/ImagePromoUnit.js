import React, { Component, PropTypes } from 'react';
import {Link } from 'components';
import { ResponsiveImage, IconButton, AbsoluteCenteredContent} from 'components';
import promoStyles from './promoUnit.scss';

export default class ImagePromoUnit extends Component {

  static propTypes = {
    image: PropTypes.string,
    styles: PropTypes.object,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired
  };

  render() {
    const {title, description, image, icon, URL, color} = this.props;
    const styles = {
      ...promoStyles,
      ...this.props.styles
    };
    return (
      <div className={styles.promoUnit}>
       <Link to={URL}>
        <div className={styles.imageWrapper + ' ' + styles[color]}>
          <IconButton type={icon} styles={styles}/>
          <div className={styles.imageOverlay}/>
           <If condition={image && image !== ''}>
            <ResponsiveImage image={image}/>
            <div className="image-wrapper-overlay" />
          </If>
          <If condition={!image || image === ''}>
            <AbsoluteCenteredContent alignCenter styles={{absoluteWrapper: styles.absoluteTextWrapper}}>
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
