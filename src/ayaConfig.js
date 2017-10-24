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
  mongoDBURL: process.env.mongoURL || 'mongodb://localhost/test',
  app: {
    title: 'Aya',
    description: description,
    head: {
      titleTemplate: '%s | Aya',
      defaultTitle: 'Aya',
      meta: [
      {name: 'description', content: description},
      {name: 'keywords', content: 'yoga, meditation, vegan, spirtuality, recipes'},
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'Aya'},
      {property: 'og:image', content: ''},
      {property: 'og:locale', content: 'en_GB'},
      {property: 'og:title', content: 'Aya'},
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
