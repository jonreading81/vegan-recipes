require('babel-polyfill');

const description = 'The forests are calling us to return to our authentic selves. It is not so much giving up on our modern culture but more that we now take the time to listen to our inner selves.';
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
    title: 'Call of the Forest',
    birdsong: 'audio/birdsong.mp3',
    description: description,
    head: {
      titleTemplate: 'Call of the Forest - %s',
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
