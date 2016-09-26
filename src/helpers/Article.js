import get from 'lodash/get';

export default class Article {

  constructor(data) {
    this.content = get(data, 'content.rendered');
    this.title = get(data, 'title.rendered');
    this.image = get(data, 'acf.hero_image');
    this.subText = get(data, 'acf.sub_text');
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
  }

  getImage() {
    return this.image;
  }

  getSubText() {
    return this.subText;
  }
}

