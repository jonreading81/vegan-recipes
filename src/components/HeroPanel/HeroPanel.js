import React, { Component, PropTypes } from 'react';
import { ResponsiveImage} from 'components';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

export default class HeroPanel extends Component {


  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.string,
    type: PropTypes.string,
    isEmpty: PropTypes.bool,
    hasBreadcrumb: PropTypes.bool,
    subTitle: PropTypes.string,
    image: PropTypes.string.isRequired
  }
  render() {
    require('./HeroPanel.scss');
    const {title, subTitle, image, isEmpty, children, hasBreadcrumb} = this.props;
    const type = get( this.props, 'type', 'site-heading');
    let className = 'hero-panel';
    let style = this.props.style;
    if (isEmpty) className += ' hero-panel-empty';
    if (hasBreadcrumb) className += ' hero-panel-with-breadcrumb';
    if (!style) style = 'image-focus-center';
    className = className + ' hero-panel-' + style;

    return (
      <header className={className} >
            <div className="image-wrapper">
              <If condition={!isUndefined(image)}>
                <ResponsiveImage image={image}/>
              </If>
              <div className="image-wrapper-holder" />
              <div className="image-wrapper-overlay" />
            </div>
            <div className="hero-panel-type">
              <div className="hero-panel-type-lining">
                <div className={type}>
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">

                      <If condition={!isUndefined(title)}>
                        <h1>{title}</h1>
                        <hr className="small" />
                      </If>
                      <If condition={subTitle}>
                        <span className="subheading">{subTitle}</span>
                      </If>
                      {children}
                    </div>
                </div>
              </div>
            </div>
        </header>
    );
  }
}
