import React, { Component, PropTypes } from 'react';
import {Link } from 'components';
import { ResponsiveImage, AbsoluteCenteredContent} from 'components';
import promoStyles from './AyaPromoUnit.scss';

export default class AyaImagePromoUnit extends Component {

  static propTypes = {
    image: PropTypes.string,
    styles: PropTypes.object,
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired
  };

  render() {
    const {title, image, URL, color} = this.props;
    const styles = {
      ...promoStyles,
      ...this.props.styles
    };
    return (
      <div className={styles.promoUnit}>
       <Link to={URL}>
        <div className={styles.imageWrapper + ' ' + styles[color]}>
           <If condition={image && image !== ''}>
            <ResponsiveImage image={image}/>
          </If>
          <If condition={!image || image === ''}>
            <AbsoluteCenteredContent alignCenter styles={{absoluteWrapper: styles.absoluteTextWrapper}}>
              <h4 className={styles.textImage}>{title}</h4>
            </AbsoluteCenteredContent>
          </If>
          <div className={styles.copy + ' ' + styles.promoTitle}>
            <If condition={image && image !== ''}>
               <h4>{title}</h4>
            </If>
          </div>
        </div>
        </Link>
      </div>
    );
  }
}
