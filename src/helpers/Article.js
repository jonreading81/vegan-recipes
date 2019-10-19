import get from 'lodash/get';
import ImageHelper from './Image';
import stripHTML from '../utils/stripHTML';

export default class Article {

  static mapToItems(articles = [], config) {
    const items = [];
    articles.map(article => {
      const myArticle = new Article(article, config);
      items.push(myArticle.getListItem());
    });
    return items;
  }

  static getURLWithSlug(slug, baseURL = '/article/') {
    const URL = baseURL + slug;
    return URL;
  }

  constructor(data, { baseURL } = {} ) {
    const content = get(data, 'content.rendered');
    this.imageHelper = new ImageHelper(this.getImage());
    this.content = content ? content.replace(/\n/gi, '') : '';
    this.title = get(data, 'title.rendered');
    this.displayHeroPanel = get(data, 'acf.display_hero_panel');
    this.slug = get(data, 'slug');
    this.description = stripHTML(get(data, 'acf.intro'));
    this.image = get(data, 'acf.hero_image');
    this.subText = get(data, 'acf.sub_text');
    this.sidePanel = get(data, 'acf.side_panel');
    this.listItem = {
      id: this.getSlug(),
      title: this.getTitle(),
      description: this.getDescription(),
      URL: this.getURL(baseURL),
      icon: 'newspaper-o',
      thumbnail: this.getImageURL('384x216'),
      image: this.getImage()
    };
  }

  getURL(baseURL) {
    return Article.getURLWithSlug( this.getSlug(), baseURL);
  }

  getImageURL(size) {
    return this.imageHelper.getImageURL(size);
  }

  getTitle() {
    return this.title;
  }

  isDisplayHeroPanel() {
    return this.displayHeroPanel;
  }

  getSlug() {
    return this.slug;
  }

  getSidePanel() {
    return this.sidePanel;
  }

  getDescription() {
    return this.description;
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

  getListItem() {
    return this.listItem;
  }
}
