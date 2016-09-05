# vegan-recipes

Univeral React / Redux Web Application using cutting edge technologies

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io)
* [Webpack](http://webpack.github.io)
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/rackt/redux)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
* [redux-form](https://github.com/erikras/redux-form) 
* [multireducer](https://github.com/erikras/multireducer) 
* [style-loader](https://github.com/webpack/style-loader)
* [react-helmet](https://github.com/nfl/react-helmet) 
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
* [mocha](https://mochajs.org/) 
* [chai](http://chaijs.com/) 
* [sinon](http://sinonjs.org/) 
* [karma](https://karma-runner.github.io/) 
* [enzyme](https://github.com/airbnb/enzyme) 


## Environment

The application can be ran and provisioned inside Absolute Orange Vagrant box

https://github.com/jonreading81/Vagrant-for-AOL

Alternatively it can be ran locally it requires:

* NodeJS
* MongoDb
* ImageMagick

Set Env: 

```bash
export STORMPATH_CLIENT_APIKEY_ID=
export STORMPATH_CLIENT_APIKEY_SECRET=
export STORMPATH_APPLICATION_HREF=
```

Add google credentials: 

```bash
vim api/data/google.json

{
  "type": "service_account",
  "project_id": "cof-survey",
  "private_key_id": "6951e8c77a700d7cbf582b0f1fff1775aaab68ce",
  "private_key": "example",
  "client_email": "cof-155@cof-survey.iam.gserviceaccount.com",
  "client_id": "104008912787416847870",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/cof-155%40cof-survey.iam.gserviceaccount.com"
}

```

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
