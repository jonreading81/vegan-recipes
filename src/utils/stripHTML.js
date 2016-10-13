import striptags from 'striptags';
const Entities = require('html-entities').AllHtmlEntities;

export default function(html) {
  return Entities.decode(striptags(html));
}
