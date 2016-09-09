require('babel-polyfill');

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
  wpAPI: 'http://blog.calloftheforest.com/wp-json/wp/v2/',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  mongoDBURL: process.env.mongoURL || 'mongodb://localhost/test',
  app: {
    title: 'Call of the Forest',
    birdsong: 'audio/birdsong.mp3',
    description: 'Never in all their history have men been able truly to conceive of the world as one: a single sphere',
    head: {
      titleTemplate: 'Call of the Forest',
      meta: [
      {name: 'description', content: 'Call of the Forest'},
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'Call of the Forest'},
      {property: 'og:image', content: ''},
      {property: 'og:locale', content: 'en_GB'},
      {property: 'og:title', content: 'Call of the Forest'},
      {property: 'og:description', content: 'Call of the Forest'},
      {property: 'og:card', content: 'summary'},
      {property: 'og:site', content: ''},
      {property: 'og:creator', content: ''},
      {property: 'og:image:width', content: ''},
      {property: 'og:image:height', content: ''}
      ]
    }
  },

}, environment);
