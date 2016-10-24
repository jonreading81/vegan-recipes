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
    const seperator = slug.lastIndexOf('-');
    const name = slug.substr(0, seperator);
    const ext = slug.substr(seperator + 1);
    const image = name + '.' + ext;
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
      updateURL: this.getURL(),
      deleteURL: this.getURL() + '/delete',
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
    const slug = this.getSlugFromImage(image);
    const seperator = slug.lastIndexOf('-');
    const name = slug.substr(0, seperator);
    return name;
    // return name.replace(/-/g, ' ');
  }

  getName() {
    return this.name;
  }

  getSlugFromImage(image) {
    const seperator = image.lastIndexOf('.');
    const name = image.substr(0, seperator);
    const ext = image.substr(seperator + 1);
    const slug = name + '-' + ext;
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

