import get from 'lodash/get';
import ImageHelper from './Image';
import {formatFormData} from '../utils/forms';
import has from 'lodash/has';
// import truncate from 'lodash/truncate';

export default class Link {

  static formatFormData(data) {
    console.log(data);
    const formattedType = [];
    data.type.map((item) => {
      if (has(item, 'value')) {
        formattedType.push(item.value);
      }
    });
    data.type = formattedType;
    console.log(data);
    return formatFormData(data);
  }

  static getURLWithSlug(slug, action = false) {
    let URL = '/link/' + slug;
    if (action) {
      URL = URL + '/' + action;
    }
    return URL;
  }

  static getURLWithData(data, action = false) {
    const myHelper = new Link(data);
    return myHelper.getURL(action);
  }

  static getUpdateURLWithData(data) {
    return Link.getURLWithData(data, 'update');
  }


  static mapToItems(_items = []) {
    const items = [];
    _items.map(item => {
      const myHelper = new Link(item);
      items.push(myHelper.getListItem());
    });
    return items;
  }

  constructor(link = {}) {
    this.link = link;
    this.imageHelper = new ImageHelper(this.getImage());
    this.listItem = {
      id: this.getSlug(),
      title: this.getTitle(),
      description: '',
      URL: this.getExternalURL(),
      icon: 'bolt',
      color: 'blue',
      thumbnail: this.getImageURL('384x216'),
      image: this.getImage(),
      updateURL: this.getUpdateURL(),
      deleteURL: this.getDeleteURL(),
    };
  }

  getLink() {
    return this.link;
  }

  getURL(action = false) {
    return Link.getURLWithSlug( this.getSlug(), action);
  }

  getType() {
    return get(this.getLink(), 'type');
  }
  getSlug() {
    return get(this.getLink(), 'slug');
  }

  getExternalURL() {
    return get(this.getLink(), 'URL');
  }

  getTitle() {
    return get(this.getLink(), 'title');
  }

  getDescription() {
    return get(this.getLink(), 'description');
  }

  getImage() {
    return get(this.getLink(), 'image');
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

