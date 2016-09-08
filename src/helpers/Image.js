import forOwn from 'lodash/forOwn';

export default class ImageHelper {

  static formatFormData(data) {
    const formData = new FormData();
    forOwn(data, (fieldValue, fieldIndex) => {
      formData.append(fieldIndex, fieldValue);
    });
    formData.append('image', data.image[0]);
    return formData;
  }


  static mapToItems(images = []) {
    const items = [];
    images.map(image => {
      const myImage = new ImageHelper(image);
      items.push(myImage.getListItem());
    });
    return items;
  }
  static getImageFromSlug(slug) {
    let image = slug;
    image += '.jpeg';
    return image;
  }

  static getURLWithData() {
    return 'url';
  }

  constructor(image = '') {
    this.image = image;
    this.name = this.getNameFromImage(image);
    this.slug = this.getSlugFromImage(image);
    this.URL = '/images/' + this.getSlug();
    this.listItem = {
      id: image,
      icon: 'image',
      description: '',
      URL: this.getURL(),
      path: this.getImageURL(),
      title: this.getName(),
      thumbnail: this.getImageURL('384x216'),
      image: image
    };
  }

  getImage() {
    return this.image;
  }

  getURL() {
    return this.URL;
  }

  getNameFromImage(image) {
    const name = this.getSlugFromImage(image);
    name.replace('-', ' ');
    return name;
  }

  getName() {
    return this.name;
  }

  getSlugFromImage(image) {
    let slug = image;
    slug = slug.slice(0, -5);
    return slug;
  }

  getSlug() {
    return this.slug;
  }

  getImageURL(size) {
    return '/images/' + size + '/' + this.getImage();
  }

  getListItem() {
    return this.listItem;
  }
}

