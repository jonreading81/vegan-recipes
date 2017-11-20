require('babel-polyfill');

const description = 'Call of the forest is a platform dedicated to helping raise the conciousness of ourselves and those around us';
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  googleAnlaytics: 'UA-82807918-1',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  imagesPath: 'https://s3-eu-west-1.amazonaws.com/vegan-recipes-static/images/',
  mongoDBURL: process.env.mongoURL || 'mongodb://localhost/test',
  app: {
    title: 'Call of the Forest',
    birdsong: 'audio/birdsong.mp3',
    description: description,
    head: {
      titleTemplate: '%s | Call of the Forest',
      defaultTitle: 'Call of the Forest',
      meta: [
      {name: 'description', content: description},
      {name: 'keywords', content: 'yoga, meditation, vegan, spirtuality, recipes'},
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'Call of the Forest'},
      {property: 'og:image', content: ''},
      {property: 'og:locale', content: 'en_GB'},
      {property: 'og:title', content: 'Call of the Forest'},
      {property: 'og:description', content: description},
      {property: 'og:card', content: 'summary'},
      {property: 'og:site', content: ''},
      {property: 'og:creator', content: ''},
      {property: 'og:image:width', content: ''},
      {property: 'og:image:height', content: ''}
      ]
    }
  },

}, environment);
