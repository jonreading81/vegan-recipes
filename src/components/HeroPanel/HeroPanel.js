import React, { Component, PropTypes } from 'react';
import { ResponsiveImage} from 'components';
import get from 'lodash/get';

export default class HeroPanel extends Component {


  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    subTitle: PropTypes.string,
    image: PropTypes.string.isRequired
  }
  render() {
    require('./HeroPanel.scss');
    const {title, subTitle, image} = this.props;
    const type = get( this.props, 'type', 'site-heading');
    return (
      <header className="hero-panel" >
            <div className="image-wrapper">
              <ResponsiveImage image={image}/>
              <div className="image-wrapper-overlay" />
            </div>
            <div className="hero-panel-type">
              <div className={type}>
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <h1>{title}</h1>
                  <hr className="small" />
                    <If condition={subTitle}>
                      <span className="subheading">{subTitle}</span>
                    </If>
                  </div>
              </div>
            </div>
        </header>
    );
  }
}
