module.exports = {
  aws: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY
  },
  imagesPath : 'api/images/',
  staticBucket: {
      name: "vegan-recipes-static",
      region: 'eu-west-1',
      url: 'https://s3-eu-west-1.amazonaws.com/vegan-recipes-static/'
  }
}
