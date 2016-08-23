import React, { Component, PropTypes } from 'react';
import { ResponsiveImage} from 'components';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

export default class HeroPanel extends Component {


  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    type: PropTypes.string,
    isEmpty: PropTypes.bool,
    subTitle: PropTypes.string,
    image: PropTypes.string.isRequired
  }
  render() {
    require('./HeroPanel.scss');
    const {title, subTitle, image, isEmpty, children} = this.props;
    const type = get( this.props, 'type', 'site-heading');
    return (
      <header className={!isEmpty ? 'hero-panel' : 'hero-panel hero-panel-empty'} >
            <div className="image-wrapper">
              <ResponsiveImage image={image}/>
              <div className="image-wrapper-holder" />
              <div className="image-wrapper-overlay" />
            </div>
            <div className="hero-panel-type">
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
        </header>
    );
  }
}
