import React, { Component, PropTypes } from 'react';
import { Image} from 'react-bootstrap';
import ImageHelper from 'helpers/Image';

export default class ResponsiveImage extends Component {


  static propTypes = {
    image: PropTypes.string.isRequired
  }

  render() {
    const {image} = this.props;
    const myImageHelper = new ImageHelper(image);
    return (
       <Image width="100%" data-sizes="auto" src={myImageHelper.getImageURL('128x72')} className="lazyload blur-up"
            data-srcset={
                myImageHelper.getImageURL('256x144') + ' 256w, ' +
                myImageHelper.getImageURL('384x216') + ' 384w, ' +
                myImageHelper.getImageURL('640x360') + ' 640w,' +
                myImageHelper.getImageURL('768x432') + ' 768w,' +
                myImageHelper.getImageURL('1024x576') + ' 1024w,' +
                myImageHelper.getImageURL('1248x702') + ' 1248w'
              }
            />
    );
  }
}
