import get from 'lodash/get';
import ImageHelper from './Image';

export default class Inspiration {

  static formatFormData(data) {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    return formData;
  }

  static getURLWithSlug(slug, action = false) {
    let URL = '/inspiration/' + slug;
    if (action) {
      URL = URL + '/' + action;
    }
    return URL;
  }

  static getURLWithData(data) {
    const myHelper = new Inspiration(data);
    return myHelper.getURL();
  }


  static mapToItems(_items = []) {
    const items = [];
    _items.map(item => {
      const myHelper = new Inspiration(item);
      items.push(myHelper.getListItem());
    });
    return items;
  }

  constructor(inspiration = {}) {
    this.inspiration = inspiration;
    this.imageHelper = new ImageHelper(this.getImage());
    this.listItem = {
      id: this.getSlug(),
      title: this.getTitle(),
      description: this.getQuote(),
      URL: this.getURL(),
      icon: '',
      thumbnail: this.getImageURL('384x216'),
      image: this.getImage(),
      updateURL: this.getUpdateURL(),
      deleteURL: this.getDeleteURL(),
    };
  }

  getInspiration() {
    return this.inspiration;
  }

  getURL(action = false) {
    return Inspiration.getURLWithSlug( this.getSlug(), action);
  }

  getSlug() {
    return get(this.getInspiration(), 'slug');
  }

  getQuote() {
    return get(this.getInspiration(), 'quote');
  }

  getQuoteAuthor() {
    return get(this.getInspiration(), 'quoteAuthor');
  }

  getTitle() {
    return get(this.getInspiration(), 'title');
  }

  getAuthor() {
    return get(this.getInspiration(), 'author');
  }

  getImage() {
    return get(this.getInspiration(), 'image');
  }

  getImageURL(size) {
    return this.imageHelper.getImageURL(size);
  }

  getUpdateURL() {
    return this.getURL('update');
  }

  getDeleteURL() {
    return this.getURL('delete');
  }

  getListItem() {
    return this.listItem;
  }
}

