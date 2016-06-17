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
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React Redux Boilerplate',
    description: '',
    head: {
      titleTemplate: 'React Redux Boilerplate',
      meta: [
        {name: 'description', content: 'eact Redux Boilerplate.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: ''},
        {property: 'og:locale', content: 'en_GB'},
        {property: 'og:title', content: 'eact Redux Boilerplate'},
        {property: 'og:description', content: 'eact Redux Boilerplate'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: ''},
        {property: 'og:creator', content: ''},
        {property: 'og:image:width', content: ''},
        {property: 'og:image:height', content: ''}
      ]
    }
  },

}, environment);
