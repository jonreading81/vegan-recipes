require('babel-polyfill');

const description = 'Aya is an organic plantbutter used for spreading, cooking and baking';
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
      {name: 'keywords', content: 'plantbutter, Aya'},
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
      ],
      link: [
         {rel: 'shortcut icon', href: '/favicon-aya.ico'}
      ]
    }
  },

}, environment);
