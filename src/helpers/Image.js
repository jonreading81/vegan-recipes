export default class ImageHelper {

  constructor(image = '') {
    this.image = image;
  }

  getImage() {
    return this.image;
  }

  getImageURL(size) {
    return '/images/' + size + '/' + this.getImage();
  }
}

