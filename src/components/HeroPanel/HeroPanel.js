import React, { Component, PropTypes } from 'react';
import { ResponsiveImage} from 'components';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import defaultStyles from './default.scss';

export default class HeroPanel extends Component {


  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
    isEmpty: PropTypes.bool,
    hasBreadcrumb: PropTypes.bool,
    subTitle: PropTypes.string,
    image: PropTypes.string.isRequired
  }
  render() {
    require('./HeroPanel.scss');

    const {title, subTitle, image, isEmpty, children, hasBreadcrumb} = this.props;
    const styles = this.props.styles || defaultStyles;
    const type = get( this.props, 'type', 'site-heading');
    const imageWrapperHolderClassName = image ? 'image-wrapper-overlay' : 'image-wrapper-overlay--no-image';
    let className = 'hero-panel';
    let style = this.props.style;
    if (isEmpty) className += ' hero-panel-empty';
    if (hasBreadcrumb) className += ` ${styles.hasBreadcrumb}`;
    if (!style) style = 'image-focus-center';
    className = className + ' hero-panel-' + style;

    return (
      <header className={`${className} ${styles.heroPanelImageFocusCenter}`} >
            <div className="image-wrapper">
              <If condition={!isUndefined(image)}>
                <ResponsiveImage image={image}/>
              </If>
              <div className="image-wrapper-holder" />
              <div className={imageWrapperHolderClassName} />
            </div>
            <div className="hero-panel-type">
              <div className="hero-panel-type-lining">
                <div className={type}>
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">

                      <If condition={!isUndefined(title)}>
                        <h1>{title}</h1>
                        <hr className={`${styles.hr} small`} />
                      </If>
                      <div className={`${styles.subTitle} subheading`}>
                        <If condition={subTitle}>
                          <p>{subTitle}</p>
                        </If>
                        {children}
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </header>
    );
  }
}
